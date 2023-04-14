import ddMetrics from 'datadog-metrics'

import {getProviderOptions} from './getProviderOptions'
import {metricsToDatadogMetricsMapper} from './metricsToDatadogMetricsMapper'
/**
 * Required environment variables:
 * DATADOG_API_HOST
 * DATADOG_API_KEY
 * DATADOG_APP_KEY
 */

export async function sendDatadogMetrics(metrics: Metrics, config: ConfigFile) {
  const options = getProviderOptions(config)
  const logger = new ddMetrics.BufferedMetricsLogger(options)

  const datadogMetrics = metricsToDatadogMetricsMapper(metrics)

  datadogMetrics.forEach(({key, value}) => {
    logger.gauge(key, value)
  })

  logger.flush()

  return Promise.resolve('sent')
}
