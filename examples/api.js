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
