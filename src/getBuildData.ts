import {getGithubActionsData} from './adapters/ci/getGithubActionsData'

async function getDataFromCI(): Promise<Build | null> {
  if (process.env.GITHUB_ACTIONS) {
    return getGithubActionsData()
  }

  return null
}

export async function getBuildData(): Promise<Build | null> {
  return getDataFromCI()
}
