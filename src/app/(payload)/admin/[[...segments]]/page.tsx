import { RootPage } from '@payloadcms/next/views'
import config from '../../../../../payload.config'
import { importMap } from '../importMap'

const Page = ({ params, searchParams }: any) =>
  RootPage({ config, params, searchParams, importMap })

export default Page
