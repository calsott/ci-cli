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

  console.log(`github ref ${process.env.GITHUB_REF}`)
  const author =
    githubEvent?.head_commit?.author?.email || process.env.GITHUB_ACTOR
  const branch = process.env.GITHUB_REF_NAME
  const commitHash = githubEvent?.head_commit?.id

  return {
    author,
    branch,
    commitHash
  }
}
