import {getGithubActionsData} from './adapters/githubActions/getGithubActionsData'

async function getDataFromCI(): Promise<Build | null> {
  if (process.env.GITHUB_ACTIONS) {
    return getGithubActionsData()
  }

  return null
}

export async function getBuildData(): Promise<Build | null> {
  return getDataFromCI()
}
