import baseLhr5 from '../../../mocks/lhr/lh-5-6-0-verge-a.json'
import baseLhr6 from '../../../mocks/lhr/lh-6-0-0-coursehero-a.json'
import baselhr930 from '../../../mocks/lhr/lh-9-3-0-coursehero-a.json'
import {getMetricsFromLhr} from './getMetricsFromLhr'

describe('getMetricsFromLhr', () => {
  it('should extract metrics for latest lhr version', () => {
    const result = getMetricsFromLhr(baselhr930)

    expect(result.version).toEqual(90300)
    expect(result.tti).toBeCloseTo(20525.58)
    expect(result.cls).toBeCloseTo(0.15)
    expect(result.fcp).toBeCloseTo(3360.16)
    expect(result.fid).toBeCloseTo(472)
    expect(result.lcp).toBeCloseTo(8206.25)
    expect(result.si).toBeCloseTo(6672.42)
    expect(result.tbt).toBeCloseTo(1602)
    expect(result.ttfb).toBeCloseTo(328.29)
  })

  it('should extract metrics for lhr v6 and higher', () => {
    const result = getMetricsFromLhr(baseLhr6)

    expect(result.version).toEqual(60000)
    expect(result.tti).toBeCloseTo(20253.43)
    expect(result.cls).toBeCloseTo(0.13)
    expect(result.fcp).toBeCloseTo(4212.46)
    expect(result.fid).toBeCloseTo(817)
    expect(result.lcp).toBeCloseTo(7180.97)
    expect(result.si).toBeCloseTo(9067.67)
    expect(result.tbt).toBeCloseTo(1675.69)
    expect(result.ttfb).toBeCloseTo(390.74)
  })

  it('should extract metrics for lhr v5 (legacy)', () => {
    const result = getMetricsFromLhr(baseLhr5)

    expect(result.version).toEqual(50600)
    expect(result.tti).toBeCloseTo(43223.58)
    expect(result.cls).toBeCloseTo(null) // above v5
    expect(result.fcp).toBeCloseTo(3313.8)
    expect(result.fid).toBeCloseTo(1006)
    expect(result.lcp).toBeCloseTo(null) // above v5
    expect(result.si).toBeCloseTo(22268.49)
    expect(result.tbt).toBeCloseTo(7101.7)
    expect(result.ttfb).toBeCloseTo(7.89)
  })
})
