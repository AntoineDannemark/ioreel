const { networkInterfaces } = require('os');
const chalk = require('chalk');
const { Select } = require('enquirer');

module.exports = async() => {
    const nets = networkInterfaces();
    const results = {};
    
    for (const name of Object.keys(nets)) {
        for (const net of nets[name]) {
            // Skip over non-IPv4 and internal (i.e. 127.0.0.1) addresses
            if (net.family === 'IPv4' && !net.internal) {            
                results[name] = net.address;
            }
        }
    }

    let localIP;

    switch(Object.keys(results).length) {
        // If no result, notify the user & error out 
        case(0):
            console.log(chalk.bold.red('[ERROR] @ getLocalIP - No local IP found, please check your connection'));          
            throw new Error('No local IP found, please check your connection');
        // If only one result, use it
        case(1):
            console.log(chalk.bold.green(`[SUCCESS] @ getLocalIP - App build will be served on your local network on IP ${Object.values(results)[0]} (${Object.keys(results)[0]})`))
            localIP = Object.values(results)[0]
            break; 
        // Else ask the user to select
        default: 
            const prompt = new Select({
                name: 'ip',
                message: 'We found more than one usable IP, please select:',
                choices: Object.entries(results).map(result => ({
                    name: result[1],
                    message: `${result[1]} - (${result[0]})`,
                }))
            });
            
            await prompt.run()
                .then(ip => {
                    console.log(chalk.bold.green(`[SUCCESS] @ getLocalIP - App build will be served on your local network on IP ${ip} (${Object.keys(results).filter(key => results[key] === ip)})`));
                    localIP = ip
                })
                .catch(err => {
                    console.log(chalk.bold.red(`[ERROR] @ getLocalIP - No IP selected`));
                    throw new Error('No IP selected');
                });
            break;
    }

    return localIP
}

