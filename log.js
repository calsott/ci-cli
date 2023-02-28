const fs = require('fs')

fs.readFile(process.env.GITHUB_EVENT_PATH, 'utf-8', (err, data) => {
  if (err) throw err
  console.log(JSON.stringify(data))
})
