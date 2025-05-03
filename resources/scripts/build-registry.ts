import fs from "node:fs"
import path from "node:path"
import { baseTheme } from "./styles/base-theme"
import { blueDark, blueLight } from "./styles/blue"
import { defaultDark, defaultLight } from "./styles/default"
import { emeraldDark, emeraldLight } from "./styles/emerald"
import { indigoDark, indigoLight } from "./styles/indigo"
import { skyDark, skyLight } from "./styles/sky"

const registryUrl = process.env.VERCEL_URL ? "https://intentui.com" : "http://localhost:3000"

type RegistryType =
  | "registry:block"
  | "registry:component"
  | "registry:lib"
  | "registry:hook"
  | "registry:ui"
  | "registry:page"
  | "registry:file"
  | "registry:style"
  | "registry:theme"

type RegistryJsonItem = {
  name: string
  extends?: "none"
  type: RegistryType
  cssVars?: Record<string, any>
  title: string
  description: string
  dependencies: string[]
  registryDependencies: string[]
  files: {
    path: string
    type: RegistryType
  }[]
}

const registryBaseStyle = {
  extends: "none",
  name: "default",
  type: "registry:style",
  title: "Base style",
  dependencies: [
    "tw-animate-css",
    "@intentui/icons",
    "tailwindcss-react-aria-components",
    "react-aria-components",
  ],
  registryDependencies: [`${registryUrl}/r/lib-primitive.json`],
  cssVars: {
    theme: baseTheme,
    light: defaultLight,
    dark: defaultDark,
  },
  files: [],
  description: "",
} satisfies RegistryJsonItem

const registryBlueStyle = {
  ...registryBaseStyle,
  name: "blue",
  cssVars: {
    theme: baseTheme,
    light: blueLight,
    dark: blueDark,
  },
  title: "Blue style",
} satisfies RegistryJsonItem

const registrySkyStyle = {
  ...registryBaseStyle,
  name: "sky",
  title: "Sky style",
  cssVars: {
    theme: baseTheme,
    light: skyLight,
    dark: skyDark,
  },
} satisfies RegistryJsonItem

const registryIndigoStyle = {
  ...registryBaseStyle,
  name: "indigo",
  title: "Indigo style",
  cssVars: {
    theme: baseTheme,
    light: indigoLight,
    dark: indigoDark,
  },
} satisfies RegistryJsonItem

const registryEmeraldStyle = {
  ...registryBaseStyle,
  name: "emerald",
  title: "Emerald style",
  cssVars: {
    theme: baseTheme,
    light: emeraldLight,
    dark: emeraldDark,
  },
} satisfies RegistryJsonItem

type IntermediateRegistryItem = Partial<RegistryJsonItem> & {
  filePath: string
  internalImportPaths?: string[]
}

const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1)

const extractExternalDependencies = (content: string): string[] => {
  const importRegex = /import(?: | .* from )['"]([^'"]+)['"]/g
  const dependencies = new Set<string>()
  let match: RegExpExecArray | null

  while (true) {
    match = importRegex.exec(content)
    if (match === null) {
      break
    }
    const importPath = match[1]
    if (typeof importPath !== "string") {
      continue
    }

    if (
      !importPath.startsWith(".") &&
      !importPath.startsWith("@/") &&
      !importPath.startsWith("node:") &&
      !["react", "react-dom", "clsx", "tailwind-merge", "next", "embla-carousel-react"].includes(
        importPath,
      )
    ) {
      dependencies.add(importPath === "motion/react" ? "motion" : importPath)
    }
  }
  return Array.from(dependencies).sort()
}

const extractInternalDependencyPaths = (
  content: string,
  currentFilePath: string,
  projectRoot: string,
): string[] => {
  const importRegex = /import .* from ['"](@\/[^'"]+)['"]/g
  const internalImportsRaw = new Set<string>()
  let match: RegExpExecArray | null

  while (true) {
    match = importRegex.exec(content)
    if (match === null) {
      break
    }
    const rawImport = match[1] // e.g., @/components/ui/button
    if (typeof rawImport === "string") {
      internalImportsRaw.add(rawImport)
    }
  }

  const resolvedPaths = new Set<string>()
  for (const rawImport of internalImportsRaw) {
    // Assuming @/ maps to project root
    const relativeToRoot = rawImport.replace(/^@\//, "")
    const potentialPaths = [
      path.resolve(projectRoot, `${relativeToRoot}.ts`),
      path.resolve(projectRoot, `${relativeToRoot}.tsx`),
      path.resolve(projectRoot, `${relativeToRoot}/index.ts`),
      path.resolve(projectRoot, `${relativeToRoot}/index.tsx`),
    ]

    let foundPath: string | null = null
    for (const p of potentialPaths) {
      if (fs.existsSync(p)) {
        if (path.resolve(p) !== path.resolve(currentFilePath)) {
          foundPath = path.resolve(p)
          break
        }
      }
    }

    if (foundPath) {
      resolvedPaths.add(foundPath)
    } else {
      // console.warn(`Could not resolve internal import '${rawImport}' from ${currentFilePath}`);
    }
  }

  return Array.from(resolvedPaths)
}

const generateComponentRegistry = () => {
  const registryJsonPath = "registry.json"
  const projectRoot = process.cwd()

  const sources = [
    { type: "ui", path: "components/ui" },
    { type: "block", path: "components/blocks" },
    { type: "lib", path: "lib" },
    { type: "hook", path: "hooks" },
  ]

  const getAllFiles = (dirPath: string, arrayOfFiles: string[] = []): string[] => {
    if (!fs.existsSync(dirPath)) {
      return []
    }
    const files = fs.readdirSync(dirPath)
    for (const file of files) {
      const fullPath = path.join(dirPath, file)
      if (fs.statSync(fullPath).isDirectory()) {
        getAllFiles(fullPath, arrayOfFiles)
      } else if (file.endsWith(".tsx") || file.endsWith(".ts")) {
        arrayOfFiles.push(path.resolve(fullPath))
      }
    }
    return arrayOfFiles
  }

  console.info("Scanning components and libraries (Pass 1)...")
  const intermediateData: Map<string, IntermediateRegistryItem> = new Map()
  const filePathToKeyMap: Map<string, string> = new Map()

  for (const { type, path: sourcePath } of sources) {
    const absoluteSourcePath = path.resolve(sourcePath)
    const componentFiles = getAllFiles(absoluteSourcePath)

    for (const absoluteFilePath of componentFiles) {
      const componentBaseName = path.basename(absoluteFilePath, path.extname(absoluteFilePath))
      const fileContent = fs.readFileSync(absoluteFilePath, "utf-8")

      const relativePathFromRoot = path.relative(projectRoot, absoluteFilePath).replace(/\\/g, "/")
      const relativeKey = path.relative(absoluteSourcePath, absoluteFilePath).replace(/\\/g, "/")

      const nameKey = `${type}-${relativeKey
        .replace(/\.(tsx|ts)$/, "") // Remove .tsx or .ts extension
        .replace(/\/index$/, "") // Remove trailing /index
        .replace(/^$/, componentBaseName)}`

      if (!nameKey) {
        console.warn(`Could not generate key for ${absoluteFilePath}`)
        continue
      }

      filePathToKeyMap.set(absoluteFilePath, nameKey)

      const externalDeps = extractExternalDependencies(fileContent)
      const internalDepPaths = extractInternalDependencyPaths(
        fileContent,
        absoluteFilePath,
        projectRoot,
      )

      let whatType: IntermediateRegistryItem["type"]
      switch (true) {
        case nameKey.startsWith("ui-"):
          whatType = "registry:component"
          break
        case nameKey.startsWith("block-"):
          whatType = "registry:block"
          break
        case nameKey.startsWith("lib-"):
          whatType = "registry:lib"
          break
        case nameKey.startsWith("hook-"):
          whatType = "registry:hook"
          break
        // case nameKey.startsWith("page-"):
        //   whatType = "registry:page";
        //   break;
        default:
          console.warn(`Unknown type prefix for key: ${nameKey}. Defaulting based on source type.`)
          if (type === "ui") whatType = "registry:component"
          else if (type === "block") whatType = "registry:block"
          else if (type === "lib") whatType = "registry:lib"
          else whatType = "registry:file" // Generic fallback
      }

      const item: IntermediateRegistryItem = {
        filePath: absoluteFilePath,
        name: nameKey,
        type: whatType,
        title: capitalize(componentBaseName.replace(/-/g, " ")),
        description: "",
        dependencies: externalDeps,
        files: [{ path: relativePathFromRoot, type: whatType }],
        internalImportPaths: internalDepPaths,
        registryDependencies: [],
      }

      intermediateData.set(nameKey, item)
    }
  }

  console.info("Resolving registry dependencies (Pass 2)...")
  for (const item of intermediateData.values()) {
    const resolvedRegistryDeps = new Set<string>()
    if (item.internalImportPaths) {
      for (const importPath of item.internalImportPaths) {
        const dependencyKey = filePathToKeyMap.get(importPath)
        if (dependencyKey && dependencyKey !== item.name) {
          resolvedRegistryDeps.add(`${registryUrl}/r/${dependencyKey}.json`)
        }
      }
    }
    if (item.registryDependencies) {
      item.registryDependencies = Array.from(resolvedRegistryDeps).sort()
    }
  }

  const themes: RegistryJsonItem[] = [
    registryBaseStyle,
    registryBlueStyle,
    registrySkyStyle,
    registryIndigoStyle,
    registryEmeraldStyle,
  ]

  console.info("Constructing final registry...")
  const finalRegistryItems: RegistryJsonItem[] = [
    ...themes,
    ...Array.from(intermediateData.values()).map((item) => {
      const { filePath, internalImportPaths, ...rest } = item
      return {
        name: rest.name || "",
        type: item.type,
        title: rest.title || "",
        description: rest.description || "",
        dependencies: rest.dependencies || [],
        registryDependencies: rest.registryDependencies || [],
        files: rest.files || [],
      } as RegistryJsonItem
    }),
  ]

  finalRegistryItems.sort((a, b) => a.name.localeCompare(b.name))

  const registryJsonObject = {
    $schema: "https://ui.shadcn.com/schema/registry.json",
    name: "intentui",
    homepage: "https://intentui.com",
    items: finalRegistryItems,
  }

  console.info(`Generating ${registryJsonPath}...`)
  fs.writeFileSync(registryJsonPath, JSON.stringify(registryJsonObject, null, 2))
  console.info(`${registryJsonPath} generation complete.`)
}

generateComponentRegistry()
