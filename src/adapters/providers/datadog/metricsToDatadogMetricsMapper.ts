const metricsToSkip = ['version']

const filterSkippedMetrics = metricKey => {
  return !metricsToSkip.includes(metricKey)
}

export function metricsToDatadogMetricsMapper(metrics: Metrics) {
  const filteredKeys = Object.keys(metrics).filter(filterSkippedMetrics)

  const mapMetric = key => ({
    key,
    value: metrics[key].value
  })

  return filteredKeys.map(mapMetric)
}
