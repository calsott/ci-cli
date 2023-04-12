import {definitions} from './definitions'

const getTTFBFactory = version => {
  if (version.major === 5) {
    return definitions.auditLegacyTimeToFirstByteMedian
  }

  return definitions.auditServerResponseTimeMedian
}

const maybeValue = value => {
  return value >= 0 ? value : null
}

export function getMetricsFromLhr(lhr) {
  const input = [lhr]
  const version = definitions.metaLighthouseVersion(input)

  // main
  const lcp = definitions.auditLargestContentfulPaintMedian(input)
  const cls = definitions.auditCumulativeLayoutShiftMedian(input)
  const fid = definitions.auditMaxPotentialFidMedian(input)
  // secondary
  const fcp = definitions.auditFirstContentfulPaintMedian(input)
  const si = definitions.auditSpeedIndexMedian(input)
  const tbt = definitions.auditTotalBlockingTimeMedian(input)
  const tti = definitions.auditInteractiveMedian(input)

  const getTTFB = getTTFBFactory(version)
  const ttfb = getTTFB(input)

  return {
    version: maybeValue(version.value),
    cls: maybeValue(cls.value),
    fcp: maybeValue(fcp.value),
    fid: maybeValue(fid.value),
    lcp: maybeValue(lcp.value),
    si: maybeValue(si.value),
    tbt: maybeValue(tbt.value),
    ttfb: maybeValue(ttfb.value),
    tti: maybeValue(tti.value)
  }
}
