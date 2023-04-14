import mockedDatadogMetrics from 'datadog-metrics'

import {metricsMock} from '../../../../mocks/metrics'
import {sendMetrics} from './sendMetrics'

const originalEnv = process.env

vi.mock('datadog-metrics', async () => {
  const gauge = vi.fn()

  function BufferedMetricsLogger() {
    return {gauge}
  }

  return {
    default: {BufferedMetricsLogger}
  }
})

describe('datadog > sendMetrics', () => {
  afterEach(() => {
    vi.clearAllMocks()
  })

  it('should returns author, branch and commitHash', async () => {
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
    const data = await sendMetrics(metricsMock, config)

    expect(logger.gauge).toHaveBeenCalled()
    expect(logger.gauge).toHaveBeenCalledTimes(8)
    expect(data).toEqual('sent')
  })
})
