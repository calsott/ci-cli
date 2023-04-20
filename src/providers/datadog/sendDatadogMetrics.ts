import ddMetrics from 'datadog-metrics'

import {getProviderOptions} from './getProviderOptions'
import {getTagsFromBuild} from './getTagsFromBuild'
import {metricsToDatadogMetricsMapper} from './metricsToDatadogMetricsMapper'

export async function sendDatadogMetrics({
  build,
  metrics,
  config,
  url
}: SendMetricsParams) {
  const options = getProviderOptions(config)
  const logger = new ddMetrics.BufferedMetricsLogger(options)

  const datadogMetrics = metricsToDatadogMetricsMapper(metrics)
  const buildTags = getTagsFromBuild(build)

  const tags = [...(url.tags ? url.tags : []), ...buildTags]

  datadogMetrics.forEach(({key, value}) => {
    logger.gauge(key, value, tags)
  })

  logger.flush()

  return Promise.resolve('sent')
}
