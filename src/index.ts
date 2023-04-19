/* eslint-disable no-console */
import {getBuildData} from './getBuildData'
import {getMetricsFromLhr} from './lib/lhr/getMetricsFromLhr'
import {loadRcFile} from './lib/loadRcFile'
import {runLighhouse} from './runLighhouse'
import {sendMetrics} from './sendMetrics'

const defaultRcFilePath = './.calsott.js'

type StartParams = {
  rcFilePath?: string
}

export async function start({rcFilePath = defaultRcFilePath}: StartParams) {
  console.log('> Starting audit...')
  const config = loadRcFile(rcFilePath)
  const build = await getBuildData()

  if (!build) {
    console.log('not in CI')
    // return
  } else {
    console.log(
      `> Data collected from CI triggered by commit: ${build.commitHash}`
    )
    console.log(build)
  }

  console.log(`> Auditing ${config.urls.length} urls...`)

  for (const url of config.urls) {
    const result = await runLighhouse({url})

    if (result) {
      console.log(`· Audit collected from ${url.href}`)
      const lhr = JSON.parse(result)
      const metrics = getMetricsFromLhr(lhr)

      const response = await sendMetrics({config, metrics, url})
      console.log(response)
    } else {
      console.log(`· Audit failed for ${url}`)
    }
  }

  console.log(`> Audit traces sent to calsott.com`)
}
