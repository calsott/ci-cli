import {readFile} from 'fs/promises'

const getGitHubEvent = async () => {
  try {
    const file = await readFile(process.env.GITHUB_EVENT_PATH, 'utf-8')
    return JSON.parse(file)
  } catch (e) {
    return {}
  }
}

export async function getGithubActionsData(): Promise<Build> {
  const githubEvent = await getGitHubEvent()

  const author =
    githubEvent?.head_commit?.author?.email || process.env.GITHUB_ACTOR
  const branch = process.env.GITHUB_REF_NAME
  const commitHash = githubEvent?.head_commit?.id
  const commitMessage = githubEvent?.head_commit?.message
  const committedAt = githubEvent?.head_commit?.timestamp
  const externalBuildUrl = `${process.env.GITHUB_SERVER_URL}${process.env.GITHUB_REPOSITORY}/actions/runs/${process.env.GITHUB_RUN_ID}`
  const name = process.env.GITHUB_WORKFLOW
  const runAt = new Date().toISOString()

  return {
    // ancestorCommittedAt: process.env.GITHUB_BASE_REF,
    // ancestorHash: process.env.GITHUB_BASE_REF,
    // avatarUrl,
    author,
    branch,
    commitHash,
    commitMessage,
    committedAt,
    externalBuildUrl,
    name,
    runAt
  }
}
