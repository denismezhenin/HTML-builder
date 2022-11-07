const fs = require('fs')
const path = require('path')
const bundleFilePath = path.join(__dirname, 'project-dist', 'bundle.css')
const stylesPath = path.join(__dirname, 'styles')

fs.rm(bundleFilePath, {force: true, recursive: true}, error => {
	if (error) throw error;
	fs.writeFile(path.join(__dirname, 'project-dist', 'bundle.css'), "", (error) => {
		if (error) throw error;
	})
	const output = fs.createWriteStream(bundleFilePath)

fs.readdir(stylesPath, (error, files) => {
	if (error) throw error;
	files.forEach(file => {
		const fileExt = path.extname(path.join(__dirname, 'styles', file))
if(fileExt == '.css') {
const input = fs.createReadStream(path.join(__dirname, 'styles', file), 'utf-8')
input.pipe(output)
}
	})
})
})
