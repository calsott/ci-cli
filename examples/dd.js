let metrics = require('datadog-metrics')

// metrics.init({site: 'datadoghq.eu', host: 'calsott', prefix: 'calsott.'})

// function collectMemoryStats() {
//   let memUsage = process.memoryUsage()
//   metrics.gauge('pepe', memUsage.heapTotal)
// }

// setInterval(collectMemoryStats, 1000)

const metricsLogger = new metrics.BufferedMetricsLogger({
  site: 'datadoghq.eu',
  apiKey: '',
  appKey: '',
  host: 'calsott',
  prefix: 'calsott.',
  flushIntervalSeconds: 15
})

function collectMemoryStats() {
  let memUsage = process.memoryUsage()
  metricsLogger.gauge('pepe', memUsage.heapTotal)
}

collectMemoryStats()
metricsLogger.flush()

// metricsLogger.gauge('mygauge', 25)
