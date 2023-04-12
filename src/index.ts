/* eslint-disable no-console */
import {getBuildData} from './getBuildData'
import {loadRcFile} from './lib/config/loadRcFile'
import {getMetricsFromLhr} from './lib/lhr/getMetricsFromLhr'
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

  for (const url of config.urls) {
    const result = await runLighhouse({url})

    if (result) {
      const lhrMetrics = getMetricsFromLhr(result)

      const data = {
        requestedUrl: result.requestedUrl,
        url: result.finalUrl,
        ...lhrMetrics
      }

      console.log(data)
      // TODO: send metrics (data) to configured adapter/s

      console.log(`· Audit collected from ${url}`)
    } else {
      console.log(`· Audit failed for ${url}`)
    }
  }

  console.log(`> Audit traces sent to calsott.com`)
}
