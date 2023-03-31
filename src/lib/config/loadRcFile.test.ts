import {describe} from 'vitest'

import {loadRcFile} from './loadRcFile'

describe('loadRcFile', () => {
  it('load rc file content', () => {
    const content = loadRcFile('./mocks/.rcFile.json')

    expect(content).toEqual({
      urls: ['https://twinandchic.com']
    })
  })
})
