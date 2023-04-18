/* eslint no-console:0 */
const path = require('path')
const gitUrlParse = require('git-url-parse')

const {exec} = require('../utils/exec')
const {showError} = require('../utils/showError')
const {getPackageJson} = require('../utils/getPackageJson')
const {checkShouldRelease} = require('./checkShouldRelease')

const githubEmail = process.env.GIT_EMAIL
const githubToken = process.env.GITHUB_TOKEN || process.env.GH_TOKEN
const githubUser = process.env.GIT_USER

const cwd = process.cwd()

const prepareAutomaticRelease = async () => {
  const {stdout} = await exec('git config --get remote.origin.url')
  const repoURL = stdout.trim()
  const gitURL = gitUrlParse(repoURL).toString('https')
  const authURL = new URL(gitURL)
  authURL.username = githubToken

  const {stdout: rawIsShallowRepository} = await exec(
    'git rev-parse --is-shallow-repository'
  )
  const isShallowRepository = rawIsShallowRepository === 'true'

  if (isShallowRepository) await exec(`git pull --unshallow --quiet`)

  await exec(`git config --global user.email "${githubEmail}"`)
  await exec(`git config --global user.name "${githubUser}"`)
  await exec('git remote rm origin')
  await exec(`git remote add origin ${authURL} > /dev/null 2>&1`)
  await exec(`git checkout main`)
  await exec(`git pull origin main`)
}

const releasePackage = async ({releaseType} = {}) => {
  await exec(`npm --no-git-tag-version version ${releaseType}`, {cwd})
  await exec(`git add ${path.join(cwd, 'package.json')}`, {cwd})

  const {version} = getPackageJson(cwd, true)

  const commitMsg = `release: v${version}  [skip ci]`

  await exec(`git commit -m "${commitMsg}"`, {cwd})
  await exec(`git commit --amend --no-verify --no-edit`, {cwd})

  await exec(`git tag -a ${version} -m "v${version}"`, {cwd})

  await exec('git push -f --tags origin HEAD')
}

checkShouldRelease()
  .then(async ({shouldRelease, releaseType}) => {
    if (!shouldRelease) {
      console.log('No release is needed')
      return
    }

    if (!releaseType) {
      console.log('No release type is provided')
      return
    }

    console.log(`Releasing a ${releaseType} version...`)

    await prepareAutomaticRelease()
    await releasePackage({releaseType})

    console.log(`Package has been released`)
  })
  .catch(err => {
    console.error(err)
    showError(err)
  })
