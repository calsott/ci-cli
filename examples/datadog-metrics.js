// DATADOG_API_HOST="datadoghq.eu" DATADOG_API_KEY=e2a58123af4b81369a21e0f361062d8a DATADOG_APP_KEY=3bec09a06606a6f14fb0e377a5d38cb6395d762a DEBUG=metrics node dd.js
let metrics = require('datadog-metrics')
metrics.init({host: 'calsott', prefix: 'calsott.'})

function collectMemoryStats() {
  let memUsage = process.memoryUsage()
  metrics.gauge('memory.rss', memUsage.rss)
  metrics.gauge('memory.heapTotal', memUsage.heapTotal)
  metrics.gauge('memory.heapUsed', memUsage.heapUsed)
}

setInterval(collectMemoryStats, 1000)

/* 
curl -X GET "https://api.datadoghq.com/api/v2/hosts" \
-H "Accept: application/json" \
-H "DD-API-KEY: e2a58123af4b81369a21e0f361062d8a" \
-H "DD-APPLICATION-KEY: 3bec09a06606a6f14fb0e377a5d38cb6395d762a"
*/
