// https://github.com/GoogleChrome/lighthouse-ci/blob/main/packages/server/test/api/statistic-definitions.test.js
import baseLhr5 from '../../../mocks/lhr/lh-5-6-0-verge-a.json'
import baseLhr6 from '../../../mocks/lhr/lh-6-0-0-coursehero-a.json'
import baseLhr62 from '../../../mocks/lhr/lh-6-2-0-coursehero-a.json'
import baseLhr641 from '../../../mocks/lhr/lh-6-4-1-coursehero-a.json'
import baseLhr700 from '../../../mocks/lhr/lh-7-0-0-coursehero-a.json'
import baseLhr800 from '../../../mocks/lhr/lh-8-0-0-coursehero-a.json'
import baselhr930 from '../../../mocks/lhr/lh-9-3-0-coursehero-a.json'
import {definitions} from './definitions'

describe('Definitions', () => {
  describe('meta lighthouse version', () => {
    const run = definitions.metaLighthouseVersion

    it('should extract the version', () => {
      expect(run([baseLhr5])).toEqual({major: 5, value: 50600})
      expect(run([baseLhr6])).toEqual({major: 6, value: 60000})
      expect(run([baseLhr62])).toEqual({major: 6, value: 60200})
      expect(run([baseLhr641])).toEqual({major: 6, value: 60401})
      expect(run([baseLhr700])).toEqual({major: 7, value: 70000})
      expect(run([baseLhr800])).toEqual({major: 8, value: 80000})
      expect(run([baselhr930])).toEqual({major: 9, value: 90300})
      expect(run([{...baseLhr5, lighthouseVersion: '1.2.3-beta.0'}])).toEqual({
        major: 1,
        value: 10203
      })
    })

    it('should fallback to 0 for bad versions', () => {
      expect(run([{...baseLhr5, lighthouseVersion: 'empty'}])).toEqual({
        major: 0,
        value: 0
      })
      expect(run([{...baseLhr5, lighthouseVersion: '5.6'}])).toEqual({
        major: 0,
        value: 0
      })
    })
  })

  describe('audit interactive median', () => {
    const run = definitions.auditInteractiveMedian

    it('should extract the median value', () => {
      const low = JSON.parse(JSON.stringify(baseLhr5))
      const high = JSON.parse(JSON.stringify(baseLhr5))
      low.audits.interactive.numericValue = 1e3
      high.audits.interactive.numericValue = 100e3
      expect(run([low, high, baseLhr5]).value).toBeCloseTo(43223.58)
      expect(run([baseLhr6, low, high]).value).toBeCloseTo(20253.43)
      expect(run([high, baseLhr62, low]).value).toBeCloseTo(19669.83)
      expect(run([high, baseLhr641, low]).value).toBeCloseTo(19945.48)
      expect(run([high, baseLhr700, low]).value).toBeCloseTo(21206.92)
      expect(run([high, baseLhr800, low]).value).toBeCloseTo(20822.103)
      expect(run([high, baselhr930, low]).value).toBeCloseTo(20525.578)
    })
  })

  describe('category performance median', () => {
    const run = definitions.categoryPerformanceMedian

    it('should extract the median value', () => {
      const low = JSON.parse(JSON.stringify(baseLhr5))
      const high = JSON.parse(JSON.stringify(baseLhr5))
      low.categories.performance.score = 0.01
      high.categories.performance.score = 0.99
      expect(run([low, high, baseLhr5]).value).toBeCloseTo(0.18)
      expect(run([baseLhr6, low, high]).value).toBeCloseTo(0.16)
      expect(run([high, baseLhr62, low]).value).toBeCloseTo(0.28)
      expect(run([high, baseLhr641, low]).value).toBeCloseTo(0.2)
      expect(run([high, baseLhr700, low]).value).toBeCloseTo(0.18)
      expect(run([high, baseLhr800, low]).value).toBeCloseTo(0.24)
      expect(run([high, baselhr930, low]).value).toBeCloseTo(0.23)
    })
  })

  describe('category performance min', () => {
    const run = definitions.categoryPerformanceMin

    it('should extract the min value', () => {
      const low = JSON.parse(JSON.stringify(baseLhr5))
      const high = JSON.parse(JSON.stringify(baseLhr5))
      low.categories.performance.score = 0.01
      high.categories.performance.score = 0.99
      expect(run([low, high, baseLhr5]).value).toBeCloseTo(0.01)
      expect(run([baseLhr6, low, high]).value).toBeCloseTo(0.01)
      expect(run([high, baseLhr62, low]).value).toBeCloseTo(0.01)
      expect(run([high, baseLhr641, low]).value).toBeCloseTo(0.01)
      expect(run([high, baseLhr700, low]).value).toBeCloseTo(0.01)
      expect(run([high, baseLhr800, low]).value).toBeCloseTo(0.01)
      expect(run([high, baselhr930, low]).value).toBeCloseTo(0.01)
    })
  })

  describe('category performance max', () => {
    const run = definitions.categoryPerformanceMax

    it('should extract the max value', () => {
      const low = JSON.parse(JSON.stringify(baseLhr5))
      const high = JSON.parse(JSON.stringify(baseLhr5))
      low.categories.performance.score = 0.01
      high.categories.performance.score = 0.99
      expect(run([low, high, baseLhr5]).value).toBeCloseTo(0.99)
      expect(run([baseLhr6, low, high]).value).toBeCloseTo(0.99)
      expect(run([high, baseLhr62, low]).value).toBeCloseTo(0.99)
      expect(run([high, baseLhr641, low]).value).toBeCloseTo(0.99)
      expect(run([high, baseLhr700, low]).value).toBeCloseTo(0.99)
      expect(run([high, baseLhr800, low]).value).toBeCloseTo(0.99)
      expect(run([high, baselhr930, low]).value).toBeCloseTo(0.99)
    })
  })
})
