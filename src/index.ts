import {getBuild} from './getBuild'
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
      'stdout'
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

  const build = getBuild()

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
        lhr: JSON.stringify(result)
      })
      console.log(`url ${url} done`)
    }
  }

  // submit to server

  console.log(JSON.stringify(build))
  console.log('---')
  console.log('---')
  console.log('---')
  console.log('---')
  console.log('---')
  console.log(JSON.stringify(runs))

  console.log(`all done`)
}

start()
