import ddMetrics from 'datadog-metrics'

import {getProviderOptions} from './getProviderOptions'
import {metricsToDatadogMetricsMapper} from './metricsToDatadogMetricsMapper'
/**
 * Required environment variables:
 * DATADOG_API_HOST
 * DATADOG_API_KEY
 * DATADOG_APP_KEY
 */
const defaultOptions = {
  flushIntervalSeconds: 15
}

export async function sendDatadogMetrics(metrics: Metrics, config: ConfigFile) {
  const options = getProviderOptions(config)
  const logger = new ddMetrics.BufferedMetricsLogger({
    ...defaultOptions,
    ...options
  })

  const datadogMetrics = metricsToDatadogMetricsMapper(metrics)

  datadogMetrics.forEach(({key, value}) => {
    logger.gauge(key, value)
  })

  return Promise.resolve('sent')
}
