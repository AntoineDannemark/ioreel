// Script to generate different capacitor configuration for dev or prod,
// defining a server ip and port when in dev mode, to enable live-reloading
// Stolen from :
// https://gist.github.com/damienromito/e6b3930ffde4c7240f109d1de69febb5

const ip = require('./getLocalIp')();

const fs = require('fs')
const path = require('path')

const configPath = path.resolve(__dirname, '../capacitor.config.json')

let rawdata = fs.readFileSync(configPath)
let capacitorConfig = JSON.parse(rawdata)

const arg = process.argv[2]
if(arg === 'dev'){
  capacitorConfig.server = {
    url: "http://" + ip + ":8100",
    cleartext: true
  }
}else{
  delete capacitorConfig.server
}

fs.writeFileSync(configPath, JSON.stringify(capacitorConfig, null, 2))