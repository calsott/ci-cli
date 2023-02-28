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
  name: 'fake#º',
  branch: 'main',
  commitMessage: 'chore: Fake',
  commitHash: 'fake',
  committedAt: 'fake',
  ancestorHash: 'fake',
  ancestorCommittedAt,
  author,
  avatarUrl,
  runAt,
  externalBuildUrl
}

const getGitHubEvent = async () => {
  try {
    const file = await readFile(GITHUB_EVENT_PATH, 'utf-8')
    return JSON.parse(file)
  } catch (e) {
    return {}
  }
}

async function getGithubActionsData() {
  const githubEvent = await getGitHubEvent()

  const runAt = new Date().toISOString()
  const externalBuildUrl = `${process.env.GITHUB_SERVER_URL}${process.env.GITHUB_REPOSITORY}/actions/runs/${process.env.GITHUB_RUN_ID}`

  const author =
    githubEvent?.head_commit?.author?.username || process.env.GITHUB_ACTOR
  const avatarUrl = githubEvent?.head_commit?.author?.avatar_url

  return {
    name: process.env.GITHUB_WORKFLOW,
    branch: process.env.GITHUB_REF_NAME, // ok
    commitMessage: process.env.GITHUB_COMMIT_MESSAGE,
    commitHash: process.env.GITHUB_SHA, // ok
    committedAt: process.env.GITHUB_COMMIT_DATE,
    ancestorHash: process.env.GITHUB_BASE_REF,
    ancestorCommittedAt: process.env.GITHUB_BASE_REF,
    author,
    avatarUrl,
    runAt,
    externalBuildUrl
  }
}

async function getDataFromCI() {
  if (process.env.GITHUB_ACTIONS === 'true') {
    return getGithubActionsData()
  }

  return fakeData
}

export async function getBuild() {
  return getDataFromCI() || {}
}
