import {getGitlabCIData} from './getGitlabCIData'

const originalEnv = process.env

const refName = 'main'
const author = 'john.doe@gmail.com'
const commitSha = 'f2dfa08972bc1cefcfa2ad9ebac1010bc4fb777b'
const mrId = '151'

describe('getGitlabCIData', () => {
  afterAll(() => {
    process.env = originalEnv
  })

  it('should returns author, branch and commitHash in branch pipeline', async () => {
    process.env = {
      ...originalEnv,
      GITLAB_USER_EMAIL: author,
      CI_COMMIT_BRANCH: refName,
      CI_COMMIT_SHA: commitSha
    }

    const data = await getGitlabCIData()

    expect(data).toEqual({
      author: author,
      branch: refName,
      commitHash: commitSha
    })
  })

  it('should returns author, branch, commitHash and pull request Id in a merge request pipeline', async () => {
    process.env = {
      ...originalEnv,
      GITLAB_USER_EMAIL: author,
      CI_COMMIT_REF_NAME: refName,
      CI_COMMIT_SHA: commitSha,
      CI_MERGE_REQUEST_IID: mrId
    }

    const data = await getGitlabCIData()

    expect(data).toEqual({
      author: author,
      branch: refName,
      commitHash: commitSha,
      pullRequestId: mrId
    })
  })
})
