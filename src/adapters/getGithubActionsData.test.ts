import {getGithubActionsData} from './getGithubActionsData'

const originalEnv = process.env
const githubEventPathMock = './mocks/githubEventPath.json'
const githubPREventPathMock = './mocks/githubEventPathPullRequest.json'
const githubRefName = 'main'
const fallbackActor = 'john.doe@gmail.com'

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
      author: 'jane.doe@gmail.com',
      branch: githubRefName,
      commitHash: 'f2dfa08972bc1cefcfa2ad9ebac1010bc4fb777b'
    })
  })

  it('should use process.env.GITHUB_REF_NAME as author fallback', async () => {
    process.env = {
      ...originalEnv,
      GITHUB_EVENT_PATH: undefined,
      GITHUB_REF_NAME: githubRefName,
      GITHUB_ACTOR: fallbackActor
    }

    const data = await getGithubActionsData()

    expect(data.author).toEqual(fallbackActor)
  })

  it('should returns pull request id for pull request trigger', async () => {
    process.env = {
      ...originalEnv,
      GITHUB_EVENT_PATH: githubPREventPathMock,
      GITHUB_ACTOR: fallbackActor
    }

    const data = await getGithubActionsData()

    expect(data).toEqual({
      author: fallbackActor,
      branch: 'fix/get-pr-number',
      commitHash: '8fc87d2cfeee620c066b47a68c0be32d23e60434',
      pullRequestId: '14'
    })
  })
})
