/* eslint-disable no-console */
import {getBuildData} from './getBuildData'
import {getMetricsFromLhr} from './lib/lhr/getMetricsFromLhr'
import {loadRcFile} from './lib/loadRcFile'
import {runLighhouse} from './runLighhouse'
import {sendMetrics} from './sendMetrics'

const defaultRcFilePath = './.calsot.js'

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
      const lhr = JSON.parse(result)
      const lhrMetrics = getMetricsFromLhr(lhr)

      const metrics = {
        requestedUrl: result.requestedUrl,
        url: result.finalUrl,
        ...lhrMetrics
      }

      const result = await sendMetrics(metrics, config)
      console.log(result)
      console.log(`· Audit collected from ${url}`)
    } else {
      console.log(`· Audit failed for ${url}`)
    }
  }

  console.log(`> Audit traces sent to calsott.com`)
}
