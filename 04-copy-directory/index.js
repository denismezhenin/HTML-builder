const fs = require('fs')
const path = require('path')
const filesPath = path.join(__dirname, 'files')
const filesCopyPath = path.join(__dirname, 'files-copy')
fs.rm(filesCopyPath, {force: true, recursive: true}, error => {
	if (error) throw error;
	fs.mkdir(filesCopyPath, { recursive: true }, error => {
		if (error) throw error;
		fs.readdir(path.join(__dirname, 'files'), (error, files) => {
			if (error) throw error;
			files.forEach(file => {
				fs.copyFile(path.join(__dirname, 'files', file), path.join(__dirname, 'files-copy', file),  error => {
					if (error) {
						throw error;
					}
				})
			})
		})
	})
})

