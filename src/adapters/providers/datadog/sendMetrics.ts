import ddMetrics from 'datadog-metrics'

import {getProviderOptions} from './getProviderOptions'
import {metricsToDatadogMetricsMapper} from './metricsToDatadogMetricsMapper'
/**
 * Required environment variables:
 * DATADOG_API_HOST="datadoghq.eu"
 * DATADOG_API_KEY=e2a58123af4b81369a21e0f361062d8a
 * DATADOG_APP_KEY=3bec09a06606a6f14fb0e377a5d38cb6395d762a
 */

export async function sendMetrics(metrics: Metrics, config: ConfigFile) {
  const options = getProviderOptions(config)
  const logger = new ddMetrics.BufferedMetricsLogger(options)

  const datadogMetrics = metricsToDatadogMetricsMapper(metrics)

  datadogMetrics.forEach(({key, value}) => {
    logger.gauge(key, value)
  })

  return Promise.resolve('sent')
}
