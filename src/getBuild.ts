import {getGithubActionsData} from './adapters/getGithubActionsData'

async function getDataFromCI(): Promise<Build | null> {
  if (process.env.GITHUB_ACTIONS) {
    return getGithubActionsData()
  }

  return null
}

export async function getBuild(): Promise<Build | null> {
  return getDataFromCI()
}
