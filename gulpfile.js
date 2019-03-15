const fs = require('fs')
const shell = require('shelljs')
const axios = require('axios')
const log = require('fancy-log')
const pkg = require('./package.json')
// configs
const UPLOAD_SOURCE = 'dist'
const SECRET = 'SyKH-E8ZX'

exports.upload = (cb) => {
  const files = {}
  const config = {
    'name': pkg.name,
    'group': 'hybrid',
  }
  const branch = shell.exec('git rev-parse --abbrev-ref HEAD')
  const hash = shell.exec('git rev-parse --short HEAD')
  if (branch.code !== 0 || hash.code !== 0) {
    log.error(branch.stderr + hash.stderr)
    return
  }

  fs.readdir(UPLOAD_SOURCE, (e, result) => {
    result.forEach((file) => {
      if (/\.html$/.test(file)) {
        const path = file.split('.')[0]
        const data = fs.readFileSync(`${UPLOAD_SOURCE}/${file}`, 'utf-8')
        files[path] = data
      }
    })
    axios.post('https://fedpy.ruguoapp.com/dpy/image/create', {
      ...config,
      files,
      secret: SECRET,
      version: `${branch.stdout}-${hash.stdout}`,
    }).then(() => {
      log('上传成功')
    }).catch((e) => {
      log.error(e)
    })
  })
  cb && cb()
}
