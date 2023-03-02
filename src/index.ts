// import {writeFile} from 'fs'

import {getBuild} from './getBuild'
import {trace} from './trace'
import {loadRcFile} from './utils/loadRcFile'

const execa = require('execa')

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
    console.log(error) // eslint-disable-line no-console
    return null
  }
}

async function start() {
  console.log('starting...')
  const config = loadRcFile('./.calsot.json')

  const build = await getBuild()

  if (!build) {
    console.log('not in CI')
    return
  }

  const runs = []

  for (let url of config.urls) {
    const result = await run({url})

    if (result) {
      runs.push({
        url,
        representative: true,
        lhr: result
      })

      // writeFile(
      //   `${new Date().getTime()}.json`,
      //   JSON.stringify(result),
      //   'utf8',
      //   err => {
      //     if (err) {
      //       console.log(err)
      //     }
      //   }
      // )
      console.log(`url ${url} done`)
    }
  }

  trace({
    build,
    runs
  })

  console.log(`all done`)
}

start()
