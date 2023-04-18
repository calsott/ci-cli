function showError(msg) {
  console.error(`✖ Error: ${msg}\n`)
  process.exit(1)
}

module.exports = {
  showError
}
