const fs = require('fs');
const path = require('path');

const apiPath = path.resolve(__dirname, '../src/api');

const files = fs.readdirSync(apiPath, {withFileTypes: true});
const dirs = files.filter(f => f.isDirectory()).map(f => f.name);

dirs.filter(dirname => !dirname.includes('.')).forEach(dir => {
    let actionFiles = fs.readdirSync(path.join(apiPath, dir));
    console.log(actionFiles)
});