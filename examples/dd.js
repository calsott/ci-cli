// DATADOG_API_HOST="datadoghq.eu" DATADOG_API_KEY=e2a58123af4b81369a21e0f361062d8a DATADOG_APP_KEY=3bec09a06606a6f14fb0e377a5d38cb6395d762a DEBUG=metrics node dd.js
let metrics = require('datadog-metrics')
metrics.init({site: 'datadoghq.eu', host: 'calsott', prefix: 'calsott.'})

// const metricsLogger = new metrics.BufferedMetricsLogger({
//   site: 'datadoghq.eu',
//   // apiKey: 'e2a58123af4b81369a21e0f361062d8a',
//   host: 'calsott',
//   prefix: 'calsott.',
//   defaultTags: ['env:development'],
//   onError(error) {
//     console.error('There was an error auto-flushing metrics:', error)
//   }
// })

// metricsLogger.gauge('mygauge', 25)
function collectMemoryStats() {
  let memUsage = process.memoryUsage()
  metrics.gauge('pepe', memUsage.heapTotal)
}

setInterval(collectMemoryStats, 1000)

/* 
curl -X GET "https://api.datadoghq.com/api/v2/hosts" \
-H "Accept: application/json" \
-H "DD-API-KEY: e2a58123af4b81369a21e0f361062d8a" \
-H "DD-APPLICATION-KEY: 3bec09a06606a6f14fb0e377a5d38cb6395d762a"
*/
