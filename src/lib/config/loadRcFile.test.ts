import {describe} from 'vitest'

import {loadRcFile} from './loadRcFile'

const testFiles = {
  json: './mocks/configFiles/.rcFile.json',
  js: './mocks/configFiles/.rcFile.js',
  cjs: './mocks/configFiles/.rcFile.cjs'
}

describe('loadRcFile', () => {
  Object.keys(testFiles).forEach(fileType => {
    it(`load rc content from ${fileType} file`, () => {
      const content = loadRcFile(testFiles[fileType])

      expect(content).toEqual({
        urls: ['https://twinandchic.com']
      })
    })
  })
})
