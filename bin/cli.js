#!/usr/bin/env node
const {program} = require('commander')
const {start} = require('../dist/index.js')
const {version} = require('../package.json')

program.version(version, '    --version')

program
  .option('--config <path>', 'Path to config file')
  .option('--token <token>', 'Access token')
  .parse()

const {config, token} = program.opts(process.argv)

start({rcFilePath: config, token})
