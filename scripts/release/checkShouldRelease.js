const {getReleaseType} = require('./getReleaseType')
const {exec} = require('../utils/exec')

const githubEmail = process.env.GIT_EMAIL
const githubToken = process.env.GITHUB_TOKEN || process.env.GH_TOKEN
const githubUser = process.env.GIT_USER

const hasRequiredData = () => githubToken && githubUser && githubEmail

const checkIsMainBranch = async () => {
  const {stdout} = await exec(`git rev-parse --abbrev-ref HEAD`)
  return stdout.trim() === 'main'
}
const checkShouldRelease = async () => {
  await exec('git pull origin main')

  const isMainBranch = await checkIsMainBranch()
  const shouldRelease = isMainBranch && hasRequiredData()
  const releaseType = await getReleaseType()

  return {shouldRelease, releaseType}
}

module.exports = {
  checkShouldRelease
}
