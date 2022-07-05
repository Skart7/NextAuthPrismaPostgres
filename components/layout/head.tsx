import React from 'react'
import Head from 'next/head'

export default function LayoutHead(title:string) {
  return (
    <Head>
        <title>{title} | NextPrismaPostgres</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
    </Head>
  )
}
