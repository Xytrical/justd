import { DefaultInstallation } from '@/components/default-installation'
import { PlainCode } from '@/components/docs/rehype/plain-code'
import { SourceCode } from '@/components/docs/rehype/source-code'
import { ManualInstallation } from '@/components/manual-installation'
import { useMDXComponent } from '@/lib/hooks/use-mdx'
import Image from 'next/image'
import { Link, type LinkProps, Snippet, type SnippetProps } from 'ui'

import { DocHow } from './doc-how'

interface MdxProps {
  code: string
}

export function MDXContent({ code }: MdxProps) {
  const Component = useMDXComponent(code)
  return (
    <Component
      components={{
        Image,
        Default: DefaultInstallation,
        ManualInstall: ManualInstallation,
        How: DocHow,
        a: (props: LinkProps) => (
          <Link target="_blank" intent="primary" {...props} className="not-prose xd2432 font-medium hover:underline" />
        ),
        SourceCode: SourceCode,
        PlainCode: PlainCode,
        Snippet: (props: SnippetProps) => <Snippet {...props} className="bg-[#0e0e10] text-white" />
      }}
    />
  )
}