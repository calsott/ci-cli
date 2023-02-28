import {readFile} from 'fs/promises'

// const buildSchema = new Schema({
//   projectId: {type: Schema.Types.ObjectId, ref: 'Project'},
//   name: {type: String, required: true},
//   branch: String,
//   commitMessage: String,
//   commitHash: String,
//   committedAt: Date,
//   ancestorHash: String,
//   ancestorCommittedAt: Date,
//   author: String,
//   avatarUrl: String,
//   runAt: Date,
//   externalBuildUrl: String,
//   createdAt: {type: Date, required: true},
//   updatedAt: Date
// })

const fakeData = {
  name: '',
  branch: 'main',
  commitMessage: 'chore: Fake',
  commitHash: '',
  committedAt: '',
  ancestorHash: '',
  ancestorCommittedAt: '',
  author: '',
  avatarUrl: '',
  runAt: '',
  externalBuildUrl: ''
}

const getGitHubEvent = async () => {
  try {
    const file = await readFile(process.env.GITHUB_EVENT_PATH, 'utf-8')
    return JSON.parse(file)
  } catch (e) {
    return {}
  }
}

async function getGithubActionsData() {
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

async function getDataFromCI() {
  if (process.env.GITHUB_ACTIONS) {
    return getGithubActionsData()
  }

  return {}
}

export async function getBuild() {
  return getDataFromCI()
}
