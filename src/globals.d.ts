/* eslint-disable no-unused-vars */

type ProviderOptions = {
  apiKey?: string
  appKey?: string
  defaultTags?: string[]
  host?: string
  prefix?: string
  site?: string
}

type Provider = {
  name: ProviderNames.Datadog
  options?: ProviderOptions
}

type PageUrl = {
  href: string
  tags: string[]
}

interface ConfigFile {
  urls: PageUrl[]
  providers: Provider[]
}

interface Build {
  author?: string
  branch?: string
  commitHash?: string
}

type SendMetricsParams = {
  build: Build
  metrics: Metrics
  config: ConfigFile
  url: PageUrl
}

type ClsMetric = {
  numericUnit: null
  value: number
}
type FcpMetric = {
  numericUnit: 'millisecond' | null
  value: number
}
type FidMetric = {
  numericUnit: 'millisecond' | null
  value: number
}
type LcpMetric = {
  numericUnit: 'millisecond' | null
  value: number
}
type SiMetric = {
  numericUnit: 'millisecond' | null
  value: number
}
type TbtMetric = {
  numericUnit: 'millisecond' | null
  value: number
}
type TtfbMetric = {
  numericUnit: 'millisecond' | null
  value: number
}
type TtiMetric = {
  numericUnit: 'millisecond' | null
  value: number
}

interface Metrics {
  cls: ClsMetric
  fcp: FcpMetric
  fid: FidMetric
  lcp: LcpMetric
  si: SiMetric
  tbt: TbtMetric
  ttfb: TtfbMetric
  tti: TtiMetric
}
