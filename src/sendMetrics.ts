import {ProviderNames} from './config/providers'
import {sendDatadogMetrics} from './providers/datadog/sendDatadogMetrics'

const providerFactory = {
  [ProviderNames.Datadog]: sendDatadogMetrics
}

export async function sendMetrics({metrics, config, url}: SendMetricsParams) {
  const providers = config.providers.map(provider => provider.name)
  let providersSent = 0

  if (providers.length === 0) {
    return Promise.resolve('No providers found')
  }

  for (const provider of providers) {
    try {
      await providerFactory[provider]({metrics, config, url})
      providersSent++
    } catch (error) {
      console.log(error)
      console.log(`Error sending metrics to ${provider}`)
    }
  }

  return Promise.resolve(
    `· Metrics for ${url.href} sent to ${providersSent} providers`
  )
}
