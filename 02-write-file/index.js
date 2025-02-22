const fs = require('fs')
const path = require('path')
const {stdin, stdout} = process
const output = fs.createWriteStream(path.join(__dirname, 'text.txt'))
stdout.write('Please write some text\n')
stdin.on('data', data => {
	if (data.toString().trim() == 'exit') {
		stdout.write('Goodbye!\n')
		process.exit()
	}
	output.write(data)
})

process.on('SIGINT', () => {
	console.log('\nGoodbye!')
	process.exit()
});