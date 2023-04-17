import ddMetrics from 'datadog-metrics'

import {getProviderOptions} from './getProviderOptions'
import {metricsToDatadogMetricsMapper} from './metricsToDatadogMetricsMapper'
/**
 * Required environment variables:
 * DATADOG_API_HOST
 * DATADOG_API_KEY
 * DATADOG_APP_KEY
 */

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
