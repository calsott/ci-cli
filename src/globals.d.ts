/* eslint-disable no-unused-vars */

type ProviderOptions = {
  host?: string
  prefix?: string
}

type Provider = {
  name: 'datadog'
  options?: ProviderOptions
}

interface ConfigFile {
  urls: string[]
  providers: Provider[]
}

interface Build {
  author?: string
  branch?: string
  commitHash?: string
}

type LHVersion = {
  value: number
  major: number
}
type ClsMetric = {
  numericUnit: 'millisecond' | null
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
  version: LHVersion
  cls: ClsMetric
  fcp: FcpMetric
  fid: FidMetric
  lcp: LcpMetric
  si: SiMetric
  tbt: TbtMetric
  ttfb: TtfbMetric
  tti: TtiMetric
}
