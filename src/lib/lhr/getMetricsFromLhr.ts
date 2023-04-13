import {definitions} from './definitions'

const getTTFBFactory = version => {
  return version.major === 5
    ? definitions.auditLegacyTimeToFirstByteMedian
    : definitions.auditServerResponseTimeMedian
}

const maybeValue = value => {
  return value >= 0 ? value : null
}

export function getMetricsFromLhr(lhr): Metrics {
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
    version,
    cls: {
      value: maybeValue(cls.value),
      numericUnit: null
    },
    fcp: {
      value: maybeValue(fcp.value),
      numericUnit: 'millisecond'
    },
    fid: {
      value: maybeValue(fid.value),
      numericUnit: 'millisecond'
    },
    lcp: {
      value: maybeValue(lcp.value),
      numericUnit: 'millisecond'
    },
    si: {
      value: maybeValue(si.value),
      numericUnit: 'millisecond'
    },
    tbt: {
      value: maybeValue(tbt.value),
      numericUnit: 'millisecond'
    },
    ttfb: {
      value: maybeValue(ttfb.value),
      numericUnit: 'millisecond'
    },
    tti: {
      value: maybeValue(tti.value),
      numericUnit: 'millisecond'
    }
  }
}
