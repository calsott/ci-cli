function showError(msg, foreignProgram) {
  console.error(colors.red(`✖ Error: ${msg}\n`))
  foreignProgram && foreignProgram.outputHelp(txt => txt)
  process.exit(1)
}

module.exports = {
  showError
}
