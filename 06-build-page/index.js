const fs = require('fs')
const path = require('path')
const filesPath = path.join(__dirname, 'assets')
const filesCopyPath = path.join(__dirname, 'project-dist', 'assets')
const bundleFilePath = path.join(__dirname, 'project-dist', 'style.css')
const stylesPath = path.join(__dirname, 'styles')

	async function del() {
	await fs.rm(filesCopyPath, {force: true, recursive: true}, error => {
		if (error) throw error;
		copyFiles(filesPath, filesCopyPath)	
	})
	}
	del()

	async function copyFiles(src, dest) {
		fs.mkdir(dest, { recursive: true }, error => {
			if (error) throw error;
			fs.writeFile(path.join(__dirname, 'project-dist', 'style.css'), "", (error) => {
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
			fs.readdir(src, {withFileTypes: true}, (error, item) => {
				if (error) throw error;
				item.forEach(item => {
					if (item.isDirectory()) {
						copyFiles((path.join(src, item.name)), (path.join(dest, item.name)))
					}
					if (item.isFile()) {
						 fs.copyFile(path.join(src, item.name), path.join(dest, item.name),  error => {
							if (error) {
								throw error;
							}
						})
					}
				})
			})
		})
		
	}

const htmlFilePath = path.join(__dirname, 'project-dist', 'index.html')
const templateFilePath = path.join(__dirname, 'template.html')
let temp

fs.readFile(templateFilePath, 'utf8', (error, data) => {
	temp = data
})

fs.readdir(path.join(__dirname, 'components'), {withFileTypes: true}, (error, files) => {
	files.forEach(file => {
		let fileName = path.parse(path.join(__dirname, file.name)).name
		let component 
		fs.readFile(path.join(__dirname, 'components', file.name), 'utf8', (err, data) => {
			if (err) throw err;
			component = data;
			temp = temp.replace(`{{${fileName}}}`, component)
			fs.rm(bundleFilePath, {force: true, recursive: true}, error => {
				if (error) throw error;
				fs.writeFile(htmlFilePath, temp, (error) => {
					if (error) throw error;
				})
			})
		})
	})
	
})
