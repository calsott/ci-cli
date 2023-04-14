import {metricsMock} from '../../../../mocks/metrics'
import {metricsToDatadogMetricsMapper} from './metricsToDatadogMetricsMapper'

describe('datadog > metricsToDatadogMetricsMapper', () => {
  it('should map metrics to Datadog metric format', () => {
    const data = metricsToDatadogMetricsMapper(metricsMock)

    expect(data).toEqual([
      {key: 'cls', value: 0.01929044736873687},
      {key: 'fcp', value: 4533.927},
      {key: 'fid', value: 150},
      {key: 'lcp', value: 5040.4929999999995},
      {key: 'si', value: 13573.686253283706},
      {key: 'tbt', value: 50},
      {key: 'ttfb', value: 384.567},
      {key: 'tti', value: 7516.991}
    ])
  })
})
