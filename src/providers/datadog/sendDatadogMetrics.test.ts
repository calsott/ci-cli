import mockedDatadogMetrics from 'datadog-metrics'

import {metricsMock} from '../../../mocks/metrics'
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
      urls: [
        {
          href: 'https://twinandchic.com',
          tags: ['page:home']
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

    const logger = new mockedDatadogMetrics.BufferedMetricsLogger()
    const data = await sendDatadogMetrics({
      metrics: metricsMock,
      config,
      url: config.urls[0]
    })

    expect(logger.gauge.calls).toEqual([
      ['cls', 0.01929044736873687, config.urls[0].tags],
      ['fcp', 4533.927, config.urls[0].tags],
      ['fid', 150, config.urls[0].tags],
      ['lcp', 5040.4929999999995, config.urls[0].tags],
      ['si', 13573.686253283706, config.urls[0].tags],
      ['tbt', 50, config.urls[0].tags],
      ['ttfb', 384.567, config.urls[0].tags],
      ['tti', 7516.991, config.urls[0].tags]
    ])
    expect(logger.gauge).toHaveBeenCalled()
    expect(logger.gauge).toHaveBeenCalledTimes(8)
    expect(logger.flush).toHaveBeenCalled()
    expect(logger.flush).toHaveBeenCalledTimes(1)
    expect(data).toEqual('sent')
  })
})
