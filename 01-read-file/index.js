const fs = require('fs')
const path = require('path')
const dirname = path.join(__dirname, 'text.txt')
const stream = fs.createReadStream(dirname, 'utf-8')
stream.on('data', data => console.log(data))
