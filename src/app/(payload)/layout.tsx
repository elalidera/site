import { RootLayout, handleServerFunctions } from '@payloadcms/next/layouts'
import React from 'react'
import config from '../../../payload.config'
import { importMap } from './admin/importMap'
import './custom.scss'

const serverFunction = async function (args: any) {
  'use server'
  return handleServerFunctions({
    ...args,
    config,
    importMap,
  })
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <RootLayout config={config} importMap={importMap} serverFunction={serverFunction}>
      {children}
    </RootLayout>
  )
}
