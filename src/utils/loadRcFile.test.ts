import {describe} from 'vitest'

import {loadRcFile} from './loadRcFile'

describe('loadRcFile', () => {
  it('load rc file content', () => {
    const content = loadRcFile('./.calsot.json')

    expect(content).toEqual({
      urls: ['http://localhost:8080', 'http://localhost:8080/list']
    })
  })
})
