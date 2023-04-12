function metaLighthouseVersion() {
  return lhrs => {
    const version = lhrs[0].lighthouseVersion || ''
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_, major = '0', minor = '0', patch = '0'] =
      version.match(/^(\d+)\.(\d+)\.(\d+)/) || []
    const versionAsNumber =
      Number(major) * 100 * 100 + Number(minor) * 100 + Number(patch)
    return {value: versionAsNumber || 0, major: Number(major)}
  }
}

function median(values: number[]) {
  const sorted = [...values].sort((a, b) => a - b)
  const medianIndex = Math.floor(values.length / 2)

  if (values.length === 0) return {value: -1}
  return {value: sorted[medianIndex]}
}

function auditNumericValueMedian(auditId: string) {
  return lhrs => {
    const values = lhrs
      .map(lhr => lhr.audits[auditId] && lhr.audits[auditId].numericValue)
      .filter(
        /** @return {value is number} */ value =>
          typeof value === 'number' && Number.isFinite(value)
      )

    return median(values)
  }
}

/**
 * @param {string} categoryId
 * @return {StatisticFn}
 */
function categoryScoreMedian(categoryId: string) {
  return lhrs => {
    const values = lhrs
      .map(
        lhr => lhr.categories[categoryId] && lhr.categories[categoryId].score
      )
      .filter(
        /** @return {value is number} */ value =>
          typeof value === 'number' && Number.isFinite(value)
      )

    return median(values)
  }
}

function categoryScoreMinOrMax(categoryId: string, type: 'min' | 'max') {
  return lhrs => {
    const values = lhrs
      .map(
        lhr => lhr.categories[categoryId] && lhr.categories[categoryId].score
      )
      .filter(
        /** @return {value is number} */ value =>
          typeof value === 'number' && Number.isFinite(value)
      )

    if (!values.length) return {value: -1}
    return {value: Math[type](...values)}
  }
}

export const definitions = {
  metaLighthouseVersion: metaLighthouseVersion(),
  auditCumulativeLayoutShiftMedian: auditNumericValueMedian(
    'cumulative-layout-shift'
  ),
  auditInteractiveMedian: auditNumericValueMedian('interactive'),
  auditSpeedIndexMedian: auditNumericValueMedian('speed-index'),
  auditFirstContentfulPaintMedian: auditNumericValueMedian(
    'first-contentful-paint'
  ),
  auditLargestContentfulPaintMedian: auditNumericValueMedian(
    'largest-contentful-paint'
  ),
  auditTotalBlockingTimeMedian: auditNumericValueMedian('total-blocking-time'),
  auditMaxPotentialFidMedian: auditNumericValueMedian('max-potential-fid'),
  auditServerResponseTimeMedian: auditNumericValueMedian(
    'server-response-time'
  ),
  auditLegacyTimeToFirstByteMedian:
    auditNumericValueMedian('time-to-first-byte'),
  categoryPerformanceMedian: categoryScoreMedian('performance'),
  categoryPwaMedian: categoryScoreMedian('pwa'),
  categorySeoMedian: categoryScoreMedian('seo'),
  categoryAccessibilityMedian: categoryScoreMedian('accessibility'),
  categoryBestPracticesMedian: categoryScoreMedian('best-practices'),
  categoryPerformanceMin: categoryScoreMinOrMax('performance', 'min'),
  categoryPwaMin: categoryScoreMinOrMax('pwa', 'min'),
  categorySeoMin: categoryScoreMinOrMax('seo', 'min'),
  categoryAccessibilityMin: categoryScoreMinOrMax('accessibility', 'min'),
  categoryBestPracticesMin: categoryScoreMinOrMax('best-practices', 'min'),
  categoryPerformanceMax: categoryScoreMinOrMax('performance', 'max'),
  categoryPwaMax: categoryScoreMinOrMax('pwa', 'max'),
  categorySeoMax: categoryScoreMinOrMax('seo', 'max'),
  categoryAccessibilityMax: categoryScoreMinOrMax('accessibility', 'max'),
  categoryBestPracticesMax: categoryScoreMinOrMax('best-practices', 'max')
}
