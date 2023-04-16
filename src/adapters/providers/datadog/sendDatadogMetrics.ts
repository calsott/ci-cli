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

  const urlPrefix = url?.name ? `${url.name}.` : ''

  datadogMetrics.forEach(({key, value}) => {
    logger.gauge(`${urlPrefix}${key}`, value)
  })

  logger.flush()

  return Promise.resolve('sent')
}
