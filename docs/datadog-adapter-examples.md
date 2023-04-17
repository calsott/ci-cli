## REST

```js
const axios = require('axios')

const apiKey = ''
const url = 'https://api.datadoghq.eu/api/v2/series'

// The data to send in the POST request
const data = {
  series: [
    {
      metric: 'pepe',
      type: 0,
      points: [
        {
          timestamp: 1636629071,
          value: 0.7
        }
      ]
    }
  ]
}

// Configure the request options
const options = {
  method: 'POST',
  url: url,
  headers: {
    'Content-Type': 'application/json',
    'DD-API-KEY': apiKey
  },
  data: data
}

// Send the metric to Datadog via API
axios(options)
  .then(response => {
    console.log(response)
  })
  .catch(error => {
    console.error(error)
  })

```

## `datadog-metrics` package

With env vars:
- `DATADOG_API_KEY` (required)
- `DATADOG_APP_KEY` (required)
- `DEBUG`

### Default usage

```js
let metrics = require('datadog-metrics')
metrics.init({host: 'calsott', prefix: 'calsott.'})

function collectMemoryStats() {
  let memUsage = process.memoryUsage()
  metrics.gauge('memory.rss', memUsage.rss)
  metrics.gauge('memory.heapTotal', memUsage.heapTotal)
  metrics.gauge('memory.heapUsed', memUsage.heapUsed)
}

setInterval(collectMemoryStats, 1000)
```

### Custom usage

```js
let metrics = require('datadog-metrics')

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
```

## `@datadog/datadog-api-client` package

```js
import {client, v2} from '@datadog/datadog-api-client'

const configuration = client.createConfiguration()
const apiInstance = new v2.MetricsApi(configuration)

const params = {
  body: {
    series: [
      {
        metric: 'system.aaa',
        type: 0,
        tags: ['test:tag'],
        points: [
          {
            timestamp: Math.round(new Date().getTime() / 1000),
            value: 0.7
          }
        ]
      }
    ]
  }
}

apiInstance
  .submitMetrics(params)
  .then(data => {
    console.log(
      'API called successfully. Returned data: ' + JSON.stringify(data)
    )
  })
  .catch(error => console.error(error))

```