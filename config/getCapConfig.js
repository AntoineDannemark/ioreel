// Script to generate different capacitor configuration for dev or prod,
// defining a server ip and port when in dev mode, to enable live-reloading
(async () => {
    const chalk = require('chalk');

    const fs = require('fs')
    const path = require('path')

    const configPath = path.resolve(__dirname, '../capacitor.config.json')

    let rawdata = fs.readFileSync(configPath)
    let capacitorConfig = JSON.parse(rawdata)

    const arg = process.argv[2];

    if(arg === 'dev'){
        try {
            const ip = await require('./getLocalIp')();

            capacitorConfig.server = {
                url: "http://" + ip + ":8100",
                cleartext: true
            }
            console.log(chalk.bold.yellow('[INFO]  @ getCapConfig - Capacitor will be listening for changes on port 8100'));
        } catch(err) {
           process.exitCode = 1;
            process.exit()
        }

    } else {
        console.log(chalk.bold.yellow('[INFO] @ getCapConfig - Capacitor set on production mode - live-reload disabled'));
        delete capacitorConfig.server
    }

    return fs.writeFileSync(configPath, JSON.stringify(capacitorConfig, null, 2))
})()