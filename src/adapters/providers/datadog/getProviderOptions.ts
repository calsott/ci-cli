import {datadogProvider} from '../../../config/providers'
// const options = {site: 'datadoghq.eu', host: 'calsott', prefix: 'calsott.'}

export function getProviderOptions(config: ConfigFile) {
  const provider = config.providers.find(
    provider => provider.name === datadogProvider.name
  )

  return provider?.options ? provider.options : {}
}