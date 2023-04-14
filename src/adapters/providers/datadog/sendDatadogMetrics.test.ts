import mockedDatadogMetrics from 'datadog-metrics'

import {metricsMock} from '../../../../mocks/metrics'
import {sendDatadogMetrics} from './sendDatadogMetrics'

const originalEnv = process.env

vi.mock('datadog-metrics', async () => {
  const gauge = vi.fn()
  const flush = vi.fn()

  function BufferedMetricsLogger() {
    return {gauge, flush}
  }

  return {
    default: {BufferedMetricsLogger}
  }
})

describe('datadog > sendMetrics', () => {
  afterEach(() => {
    vi.clearAllMocks()
  })

  it('sends metrics to datadog', async () => {
    process.env = {
      ...originalEnv,
      DATADOG_API_HOST: 'datadoghq.eu',
      DATADOG_API_KEY: 'abc',
      DATADOG_APP_KEY: 'abc'
    }

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

    const logger = new mockedDatadogMetrics.BufferedMetricsLogger()
    const data = await sendDatadogMetrics(metricsMock, config)

    expect(logger.gauge).toHaveBeenCalled()
    expect(logger.gauge).toHaveBeenCalledTimes(8)
    expect(logger.flush).toHaveBeenCalled()
    expect(logger.flush).toHaveBeenCalledTimes(1)
    expect(data).toEqual('sent')
  })
})
