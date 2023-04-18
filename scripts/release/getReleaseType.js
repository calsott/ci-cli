#!/usr/bin/env node
const fs = require('fs')
const path = require('path')
const bent = require('bent')
const git = require('simple-git')()
const {promisify} = require('util')

const getlog = promisify(git.log.bind(git))

// const RELEASE_CODES = {
//   0: 'clean',
//   1: 'path',
//   2: 'minor',
//   3: 'major'
// }

const getLastPublishedPackageJson = bent(
  'json',
  process.env.NPM_REGISTRY_URL || 'https://registry.npmjs.org/'
)

const githubEvent = JSON.parse(
  fs.readFileSync(process.env.GITHUB_EVENT_PATH).toString()
)

const deployDir = path.join(process.cwd(), process.env.DEPLOY_DIR || './')
const srcPackageDir = path.join(
  process.cwd(),
  process.env.SRC_PACKAGE_DIR || './'
)

console.log('            using deploy directory : ' + deployDir)
console.log('using src directory (package.json) : ' + srcPackageDir)

let pkg = require(path.join(deployDir, 'package.json'))

const getReleaseType = async () => {
  if (!process.env.NPM_AUTH_TOKEN)
    throw new Error('Merge-release requires NPM_AUTH_TOKEN')

  let latest
  try {
    latest = await getLastPublishedPackageJson(pkg.name + '/latest')
  } catch (e) {
    // unpublished
  }

  let messages

  if (latest) {
    if (latest.gitHead === process.env.GITHUB_SHA)
      return console.log('SHA matches latest release, skipping.')
    if (latest.gitHead) {
      try {
        let logs = await getlog({
          from: latest.gitHead,
          to: process.env.GITHUB_SHA
        })
        messages = logs.all.map(r => r.message + '\n' + r.body)
      } catch (e) {
        latest = null
      }
      // g.log({from: 'f0002b6c9710f818b9385aafeb1bde994fe3b370', to: '53a92ca2d1ea3c55977f44d93e48e31e37d0bc69'}, (err, l) => console.log(l.all.map(r => r.message + '\n' + r.body)))
    } else {
      latest = null
    }
  }
  if (!latest) {
    messages = (githubEvent.commits || []).map(
      commit => commit.message + '\n' + commit.body
    )
  }

  let version = 'patch'
  if (
    messages
      .map(
        message => message.includes('BREAKING CHANGE') || message.includes('!:')
      )
      .includes(true)
  ) {
    version = 'major'
  } else if (
    messages
      .map(message => message.toLowerCase().startsWith('feat'))
      .includes(true)
  ) {
    version = 'minor'
  }

  return version
}

module.exports = {
  getReleaseType
}
