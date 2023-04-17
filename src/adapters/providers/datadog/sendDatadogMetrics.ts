import ddMetrics from 'datadog-metrics'

import {getProviderOptions} from './getProviderOptions'
import {metricsToDatadogMetricsMapper} from './metricsToDatadogMetricsMapper'

export async function sendDatadogMetrics({
  metrics,
  config,
  url
}: SendMetricsParams) {
  const options = getProviderOptions(config)
  const logger = new ddMetrics.BufferedMetricsLogger(options)

  const datadogMetrics = metricsToDatadogMetricsMapper(metrics)

  const tags = url.tags

  datadogMetrics.forEach(({key, value}) => {
    const logArguments = [key, value, tags].filter(Boolean)
    logger.gauge.apply(null, logArguments)
  })

  logger.flush()

  return Promise.resolve('sent')
}
