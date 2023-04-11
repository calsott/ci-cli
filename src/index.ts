/* eslint-disable no-console */
import {getBuildData} from './getBuildData'
import {loadRcFile} from './lib/config/loadRcFile'
import {runLighhouse} from './runLighhouse'

const defaultRcFilePath = './.calsot.json'

type StartParams = {
  rcFilePath?: string
}

export async function start({rcFilePath = defaultRcFilePath}: StartParams) {
  console.log('> Starting audit...')
  const config = loadRcFile(rcFilePath)
  const build = await getBuildData()

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

  for (const url of config.urls) {
    const result = await runLighhouse({url})

    // TODO: map result and get all definition values (metrics)

    // TODO: send metrics to configured adapter/s

    if (result) {
      runs.push(result)

      console.log(`· Audit collected from ${url}`)
    } else {
      console.log(`· Audit failed for ${url}`)
    }
  }

  console.log(`> Audit traces sent to calsott.com`)
}
