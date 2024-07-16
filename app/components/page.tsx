import React from 'react'

import { CardListBox } from '@/app/components/partials/card-list-box'
import { OnThisPage } from '@/app/components/partials/on-this-page'
import { Header } from '@/components/header'
import { siteConfig } from '@/config/site'
import type { Metadata } from 'next'
import { Container } from 'ui'

export const metadata: Metadata = {
  title: 'Components / ' + siteConfig.name,
  description: siteConfig.description,
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL ?? siteConfig.url)
}
export default function Page() {
  return (
    <div>
      <Header>
        <span className="text-fg">Comp</span>
        <span className="text-muted-fg">onents</span>
      </Header>
      <div className="bg-muted/35 py-10 lg:py-16">
        <Container>
          <div className="flex lg:flex-row flex-col items-start gap-12">
            <OnThisPage />
            <CardListBox />
          </div>
        </Container>
      </div>
    </div>
  )
}