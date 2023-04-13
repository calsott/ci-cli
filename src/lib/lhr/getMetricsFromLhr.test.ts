import baseLhr5 from '../../../mocks/lhr/lh-5-6-0.json'
import baseLhr6 from '../../../mocks/lhr/lh-6-0-0.json'
import baselhr1001 from '../../../mocks/lhr/lh-10-0-1.json'
import {getMetricsFromLhr} from './getMetricsFromLhr'

describe('getMetricsFromLhr', () => {
  it('should extract metrics for latest lhr version', () => {
    const result = getMetricsFromLhr(baselhr1001)

    expect(result.version).toEqual({
      major: 10,
      value: 100001
    })
    expect(result.tti.value).toBeCloseTo(7516.99)
    expect(result.tti.numericUnit).toEqual('millisecond')
    expect(result.cls.value).toBeCloseTo(0.02)
    expect(result.cls.numericUnit).toEqual(null)
    expect(result.fcp.value).toBeCloseTo(4533.93)
    expect(result.fcp.numericUnit).toEqual('millisecond')
    expect(result.fid.value).toBeCloseTo(150)
    expect(result.fid.numericUnit).toEqual('millisecond')
    expect(result.lcp.value).toBeCloseTo(5040.49)
    expect(result.lcp.numericUnit).toEqual('millisecond')
    expect(result.si.value).toBeCloseTo(13573.69)
    expect(result.si.numericUnit).toEqual('millisecond')
    expect(result.tbt.value).toBeCloseTo(50)
    expect(result.tbt.numericUnit).toEqual('millisecond')
    expect(result.ttfb.value).toBeCloseTo(384.57)
    expect(result.ttfb.numericUnit).toEqual('millisecond')
  })

  it('should extract metrics for lhr v6 and higher', () => {
    const result = getMetricsFromLhr(baseLhr6)

    expect(result.version).toEqual({
      major: 6,
      value: 60000
    })
    expect(result.tti.value).toBeCloseTo(20253.43)
    expect(result.tti.numericUnit).toEqual('millisecond')
    expect(result.cls.value).toBeCloseTo(0.13)
    expect(result.cls.numericUnit).toEqual(null)
    expect(result.fcp.value).toBeCloseTo(4212.46)
    expect(result.fcp.numericUnit).toEqual('millisecond')
    expect(result.fid.value).toBeCloseTo(817)
    expect(result.fid.numericUnit).toEqual('millisecond')
    expect(result.lcp.value).toBeCloseTo(7180.97)
    expect(result.lcp.numericUnit).toEqual('millisecond')
    expect(result.si.value).toBeCloseTo(9067.67)
    expect(result.si.numericUnit).toEqual('millisecond')
    expect(result.tbt.value).toBeCloseTo(1675.69)
    expect(result.tbt.numericUnit).toEqual('millisecond')
    expect(result.ttfb.value).toBeCloseTo(390.74)
    expect(result.ttfb.numericUnit).toEqual('millisecond')
  })

  it('should extract metrics for lhr v5 (legacy)', () => {
    const result = getMetricsFromLhr(baseLhr5)

    expect(result.version).toEqual({
      major: 5,
      value: 50600
    })
    expect(result.tti.value).toBeCloseTo(43223.58)
    expect(result.tti.numericUnit).toEqual('millisecond')
    expect(result.cls.value).toBeCloseTo(null) // above v5
    expect(result.cls.numericUnit).toEqual(null)
    expect(result.fcp.value).toBeCloseTo(3313.8)
    expect(result.fcp.numericUnit).toEqual('millisecond')
    expect(result.fid.value).toBeCloseTo(1006)
    expect(result.fid.numericUnit).toEqual('millisecond')
    expect(result.lcp.value).toBeCloseTo(null) // above v5
    expect(result.lcp.numericUnit).toEqual('millisecond')
    expect(result.si.value).toBeCloseTo(22268.49)
    expect(result.si.numericUnit).toEqual('millisecond')
    expect(result.tbt.value).toBeCloseTo(7101.7)
    expect(result.tbt.numericUnit).toEqual('millisecond')
    expect(result.ttfb.value).toBeCloseTo(7.89)
    expect(result.ttfb.numericUnit).toEqual('millisecond')
  })
})
