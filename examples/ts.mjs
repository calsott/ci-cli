// DD_SITE="datadoghq.eu" DD_API_KEY="e2a58123af4b81369a21e0f361062d8a" node ts.js
/**
 * Submit metrics returns "Payload accepted" response
 */

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
