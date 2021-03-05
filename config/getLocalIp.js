const { networkInterfaces } = require('os');

module.exports = () => {
    const nets = networkInterfaces();
    const results = {};
    
    for (const name of Object.keys(nets)) {
        if (!name.includes('Ethernet') && !name.includes('WiFi')) {
            continue;
        }
    
        for (const net of nets[name]) {
            // Skip over non-IPv4 and internal (i.e. 127.0.0.1) addresses
            if (net.family === 'IPv4' && !net.internal) {            
                results[name] = net.address;
            }
        }
    }
    
    return results['Ethernet'] ? results['Ethernet'] : results['WiFi']
}

