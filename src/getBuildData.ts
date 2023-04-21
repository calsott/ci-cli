import {getGithubActionsData} from './adapters/getGithubActionsData'
import {getGitlabCIData} from './adapters/getGitlabCIData'

async function getDataFromCI(): Promise<Build | null> {
  if (process.env.GITHUB_ACTIONS) {
    return getGithubActionsData()
  }

  if (process.env.GITLAB_CI) {
    return getGitlabCIData()
  }

  return null
}

export async function getBuildData(): Promise<Build | null> {
  return getDataFromCI()
}
