import {ProviderNames} from '../../config/providers'

export function getProviderOptions(config: ConfigFile) {
  const provider = config.providers.find(
    provider => provider.name === ProviderNames.Datadog
  )

  return provider?.options ? provider.options : {}
}
