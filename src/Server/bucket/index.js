const { uploadFile } = require('./uploadFile')
const { deleteFile } = require('./deleteFile')
const { downloadFile } = require('./downloadFile')
const { getFiles } = require('./getFiles')

module.exports={
  uploadFile: uploadFile,
  deleteFile: deleteFile,
  downloadFile: downloadFile,
  getFiles: getFiles
}
