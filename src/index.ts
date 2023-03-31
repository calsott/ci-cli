/* eslint-disable no-console */
import {getBuild} from './getBuild'
import {trace} from './trace'
import {loadRcFile} from './lib/config/loadRcFile'

const execa = require('execa')

const defaultRcFilePath = './.calsot.json'

async function run({url}) {
  try {
    const {stdout} = await execa('npx', [
      'lighthouse',
      url,
      '--output',
      'json',
      '--output-path',
      // `${new Date().getTime()}.json`,
      'stdout',
      '--skip-audits',
      'screenshot-thumbnails,final-screenshot',
      '--disable-full-page-screenshot',
      '--chrome-flags',
      '"--no-sandbox --headless --disable-gpu"'
    ])
    return stdout
  } catch (error) {
    // TODO: handle error
    return null
  }
}

export async function start({
  rcFilePath = defaultRcFilePath,
  token
}: StartParams) {
  console.log('> Starting audit...')
  const config = loadRcFile(rcFilePath)
  const build = await getBuild()

  if (!build) {
    console.log('not in CI')
    return
  }

  console.log(
    `> Data collected from CI triggered by commit: ${build.commitHash}`
  )
  console.log(build)
  console.log(`> Auditing ${config.urls.length} urls...`)

  const runs = []

  for (let url of config.urls) {
    const result = await run({url})

    if (result) {
      runs.push({
        url,
        representative: true,
        lhr: result
      })

      console.log(`· Audit collected from ${url}`)
    } else {
      console.log(`· Audit failed for ${url}`)
    }
  }

  await trace({
    data: {
      build,
      runs
    },
    token
  })

  console.log(`> Audit traces sent to calsott.com`)
}
