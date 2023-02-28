'use strict'

const fs = require('fs')
const path = require('path')

const JS_FILE_EXTENSION_REGEX = /\.(cjs|js)$/i

/**
 * Parse file content to JSON.
 * @param {string} pathToRcFile
 * @param {string} contents
 * @return {LHCI.LighthouseRc}
 */
function parseFileContentToJSON(rcFilePath, rcFileContent) {
  // Check if file path ends in .js
  if (JS_FILE_EXTENSION_REGEX.test(rcFilePath)) {
    return require(rcFilePath)
  }

  // Fallback to JSON parsing
  return JSON.parse(rcFileContent)
}

export function loadRcFile(pathToRcFile) {
  const rcFilePath = path.resolve(process.cwd(), pathToRcFile)
  const rcFileContent = fs.readFileSync(rcFilePath, 'utf8')

  return parseFileContentToJSON(rcFilePath, rcFileContent)
}
