import {getGithubActionsData} from './getGithubActionsData'

const originalEnv = process.env
const githubEventPathMock = './mocks/githubEventPath.json'
const githubRefName = 'main'

describe('getGithubActionsData', () => {
  afterAll(() => {
    process.env = originalEnv
  })

  it('should returns author, branch and commitHash', async () => {
    process.env = {
      ...originalEnv,
      GITHUB_EVENT_PATH: githubEventPathMock,
      GITHUB_REF_NAME: githubRefName
    }

    const data = await getGithubActionsData()

    expect(data).toEqual({
      author: 'rafamp89@gmail.com',
      branch: githubRefName,
      commitHash: 'f2dfa08972bc1cefcfa2ad9ebac1010bc4fb777b'
    })
  })

  it('should use process.env.GITHUB_REF_NAME as author fallback', async () => {
    const fallbackActor = 'john.doe@gmail.com'

    process.env = {
      ...originalEnv,
      GITHUB_REF_NAME: githubRefName,
      GITHUB_ACTOR: fallbackActor
    }

    const data = await getGithubActionsData()

    expect(data.author).toEqual(fallbackActor)
  })
})
