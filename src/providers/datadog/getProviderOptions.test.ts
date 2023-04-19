import {getProviderOptions} from './getProviderOptions'

describe('datadog > getProviderOptions', () => {
  it('returns options from datadog provider', async () => {
    const config = {
      urls: ['https://twinandchic.com'],
      providers: [
        {
          name: 'datadog',
          options: {
            site: 'datadoghq.eu',
            host: 'twinandchic.com',
            prefix: 'tc'
          }
        }
      ]
    }

    const options = getProviderOptions(config)

    expect(options).toEqual(config.providers[0].options)
  })

  it('returns empty object if datadog provider does not have options', async () => {
    const config = {
      urls: ['https://twinandchic.com'],
      providers: [
        {
          name: 'datadog'
        }
      ]
    }

    const options = getProviderOptions(config)

    expect(options).toEqual({})
  })

  it('returns empty object if datadog provider does not exists', async () => {
    const config = {
      urls: ['https://twinandchic.com'],
      providers: []
    }

    const options = getProviderOptions(config)

    expect(options).toEqual({})
  })
})
