import {getTagsFromBuild} from './getTagsFromBuild'

describe('datadog > getTagsFromBuild', () => {
  it('returns datadog tags from build metadata', async () => {
    const build = {
      author: 'jane.doe@gmail.com',
      branch: 'feat/branch',
      commitHash: 'f2dfa08972bc1cefcfa2ad9ebac1010bc4fb777b'
    }

    const tags = getTagsFromBuild(build)

    expect(tags).toEqual([
      'branch:feat/branch',
      'commit:f2dfa08972bc1cefcfa2ad9ebac1010bc4fb777b'
    ])
  })
})
