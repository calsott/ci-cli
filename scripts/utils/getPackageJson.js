#!/usr/bin/env node
const path = require('path')

const getPackageJson = (packagePath, disableCache = false) => {
  try {
    const filePath = require.resolve(path.join(packagePath, 'package.json'))
    // Modules are cached in this object when they are required.
    // By deleting a key value from this object, the next require will reload the module.
    if (disableCache) delete require.cache[filePath]

    return require(filePath)
  } catch (e) {
    return {}
  }
}

module.exports = {
  getPackageJson
}
