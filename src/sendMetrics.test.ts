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

    const response = await sendMetrics(metricsMock, config)

    expect(response).toEqual('Metrics sent to 1 providers')
    expect(sendDatadogMetrics).toHaveBeenCalled()
  })

  it('does not send metrics if there is not a provider', async () => {
    const config = {
      urls: ['https://twinandchic.com'],
      providers: []
    }

    const response = await sendMetrics(metricsMock, config)

    expect(response).toEqual('No providers found')
  })
})
