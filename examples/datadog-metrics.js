let metrics = require('datadog-metrics')
metrics.init({host: 'calsott', prefix: 'calsott.'})

function collectMemoryStats() {
  let memUsage = process.memoryUsage()
  metrics.gauge('memory.rss', memUsage.rss)
  metrics.gauge('memory.heapTotal', memUsage.heapTotal)
  metrics.gauge('memory.heapUsed', memUsage.heapUsed)
}

setInterval(collectMemoryStats, 1000)
