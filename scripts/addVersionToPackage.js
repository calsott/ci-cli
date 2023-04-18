#!/usr/bin/env node
const fs = require('fs')
const path = require('path')
const {execSync} = require('child_process')

const srcPackageDir = path.join(
  process.cwd(),
  process.env.SRC_PACKAGE_DIR || './'
)

const setVersion = version => {
  const json = execSync(`jq '.version="${version}"' package.json`, {
    cwd: srcPackageDir
  })

  fs.writeFileSync(path.join(srcPackageDir, 'package.json'), json)
}

const run = async () => {
  let versionTag = execSync(
    'git describe --tags `git rev-list --tags --max-count=1`',
    {cwd: srcPackageDir}
  )

  console.log(`version tag ${versionTag}`)
  const version = version.slice(1)

  setVersion(version)
}

run()
