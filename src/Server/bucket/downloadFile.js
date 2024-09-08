const {
  Storage
} = require('@google-cloud/storage')
var secretManager = require('../secretManager/index')

const minutesToExpiration = 60
const options = {
  version: 'v4',
  action: 'read',
  expires: minutesToExpiration * 60 * 1000 + Date.now(),
}

downloadFile = (bucketName, fileName, secretName) => {
  return new Promise((resolve, reject) => {
    secretManager.getSecret(secretName)
      .then(keyFile => {
        const storageWithCredentials = new Storage({
          projectId: process.env.GCP_PROJECT_ID,
          credentials: keyFile
        })
        storageWithCredentials.bucket(bucketName)
          .file(fileName)
          .getSignedUrl(options)
          .then(([url]) => {
            let cleanFileName = fileName.split('/').pop()
            cleanFileName = cleanFileName.replace(/ - \d+\.\d+\.\d+ - \d+:\d+:\d+/, '')//clean date and time
            const response = {
              fileName: cleanFileName,
              fileUrl: url
            }
            resolve(response)
          })
          .catch((err) => {
            console.error('Error getting signed URL:', err)
            reject()
          })
      })
      .catch((err) => {
        console.error(`Error secret: ${err}`)
        reject(err)
      })
  })
}

module.exports = {
  downloadFile: downloadFile
}