const fs = require('fs')
const path = require('path')
fs.readdir(path.join(__dirname, 'secret-folder'), {withFileTypes: true}, (error, files) => {
	if (error) throw error;
	files.forEach(file => {
		if (file.isFile()) {
			let fileExt = path.extname(file.name).slice(1);
			let fileName = path.parse(path.join(__dirname, file.name)).name
			let fileSize
			fs.stat(path.join(__dirname, 'secret-folder', file.name), (error, stats) => {
				if (error) throw error;
				fileSize = (+stats.size / 1024).toFixed()
				console.log(`${fileName} - ${fileExt} - ${fileSize} Kb`)
			})
		}
	})
})