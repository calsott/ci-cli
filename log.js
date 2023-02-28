/* eslint-disable no-console */
const fs = require('fs')

fs.readFile(process.env.GITHUB_EVENT_PATH, 'utf-8', (err, data) => {
  if (err) throw err
  console.log(JSON.stringify(data))
})

console.log('GITHUB_BASE_REF', process.env.GITHUB_BASE_REF)
console.log('GITHUB_ACTOR', process.env.GITHUB_ACTOR)
console.log('GITHUB_REF_NAME', process.env.GITHUB_REF_NAME)
console.log('GITHUB_SERVER_URL', process.env.GITHUB_SERVER_URL)
console.log('GITHUB_REPOSITORY', process.env.GITHUB_REPOSITORY)
console.log('GITHUB_RUN_ID', process.env.GITHUB_RUN_ID)
console.log('GITHUB_WORKFLOW', process.env.GITHUB_WORKFLOW)
