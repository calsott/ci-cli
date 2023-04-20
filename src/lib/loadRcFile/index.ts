import {resolve} from 'path'
const fs = require('fs')

const JS_FILE_EXTENSION_REGEX = /\.(cjs|js)$/i

/**
 * Parse file content to JSON.
 * @return {LHCI.LighthouseRc}
 */

function parseFileContentToJSON(rcFilePath: string, rcFileContent: string) {
  // Check if file path ends in .js
  if (JS_FILE_EXTENSION_REGEX.test(rcFilePath)) {
    return require(rcFilePath)
  }

  // Fallback to JSON parsing
  return JSON.parse(rcFileContent)
}

export function loadRcFile(pathToRcFile: string): ConfigFile {
  try {
    const rcFilePath: string = resolve(process.cwd(), pathToRcFile)
    const rcFileContent: string = fs.readFileSync(rcFilePath, 'utf8')

    return parseFileContentToJSON(rcFilePath, rcFileContent)
  } catch (error) {
    return null
  }
}
