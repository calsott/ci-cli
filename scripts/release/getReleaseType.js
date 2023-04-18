#!/usr/bin/env node
const fs = require('fs')
const bent = require('bent')
const git = require('simple-git')()
const {promisify} = require('util')
const {showError} = require('../utils/showError')
const {getPackageJson} = require('../utils/getPackageJson')

const releaseType = {
  major: 'major',
  minor: 'minor',
  patch: 'patch'
}
const cwd = process.cwd()
const githubEvent = JSON.parse(
  fs.readFileSync(process.env.GITHUB_EVENT_PATH).toString()
)

const getLastPublishedPackageJson = async () => {
  const getFromRegistry = bent(
    'json',
    process.env.NPM_REGISTRY_URL || 'https://registry.npmjs.org/'
  )

  try {
    const {name} = getPackageJson(cwd, true)
    const latestPublishedPackageJson = await getFromRegistry(`${name}/latest`)

    return latestPublishedPackageJson
  } catch (e) {
    return null
  }
}

const getCommitMessages = async () => {
  const getLog = promisify(git.log.bind(git))

  let latestPublishedPackageJson = await getLastPublishedPackageJson()
  let messages

  if (latestPublishedPackageJson) {
    if (latestPublishedPackageJson.gitHead === process.env.GITHUB_SHA) {
      return console.log('SHA matches latest release, skipping.')
    }

    if (latestPublishedPackageJson.gitHead) {
      try {
        let logs = await getLog({
          from: latestPublishedPackageJson.gitHead,
          to: process.env.GITHUB_SHA
        })
        messages = logs.all.map(r => r.message + '\n' + r.body)
      } catch (e) {
        latestPublishedPackageJson = null
      }
      // g.log({from: 'f0002b6c9710f818b9385aafeb1bde994fe3b370', to: '53a92ca2d1ea3c55977f44d93e48e31e37d0bc69'}, (err, l) => console.log(l.all.map(r => r.message + '\n' + r.body)))
    } else {
      latestPublishedPackageJson = null
    }
  }

  if (!latestPublishedPackageJson) {
    messages = (githubEvent.commits || []).map(
      commit => commit.message + '\n' + commit.body
    )
  }

  return messages
}

const getReleaseType = async () => {
  if (!process.env.NPM_AUTH_TOKEN) {
    return showError('Merge-release requires NPM_AUTH_TOKEN')
  }

  const messages = await getCommitMessages()

  if (
    messages
      .map(
        message => message.includes('BREAKING CHANGE') || message.includes('!:')
      )
      .includes(true)
  ) {
    return releaseType.major
  }

  if (
    messages
      .map(message => message.toLowerCase().startsWith('feat'))
      .includes(true)
  ) {
    return releaseType.minor
  }

  return releaseType.patch
}

module.exports = {
  getReleaseType
}
