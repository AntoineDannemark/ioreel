const fs = require('fs')
const path = require('path')

const configPath = path.resolve(__dirname, '../src/app/test.js')

let string = "export const api = undefined"

const arg = process.argv[2]
if(arg === 'test'){
  string = "export const api = require('../api').default"
}

fs.writeFileSync(configPath, string)

