import {metricsMock} from '../mocks/metrics'
import {sendDatadogMetrics} from './adapters/providers/datadog/sendDatadogMetrics'
import {sendMetrics} from './sendMetrics'

vi.mock('./adapters/providers/datadog/sendDatadogMetrics', async () => {
  return {
    sendDatadogMetrics: vi.fn()
  }
})

describe('sendMetrics', () => {
  afterEach(() => {
    vi.clearAllMocks()
  })

  it('sends metrics to a provider', async () => {
    const config = {
      urls: [
        {
          href: 'https://twinandchic.com',
          name: 'home'
        }
      ],
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

    const response = await sendMetrics({
      metrics: metricsMock,
      config,
      url: config.urls[0]
    })

    expect(response).toEqual('Metrics sent to 1 providers')
    expect(sendDatadogMetrics).toHaveBeenCalled()
  })

  it('does not send metrics if there is not a provider', async () => {
    const config = {
      urls: [
        {
          href: 'https://twinandchic.com',
          name: 'home'
        }
      ],
      providers: []
    }

    const response = await sendMetrics({
      metrics: metricsMock,
      config,
      url: config.urls[0]
    })

    expect(response).toEqual('No providers found')
  })
})
