const {
  Storage
} = require('@google-cloud/storage')
var secretManager = require('../secretManager/index')

deleteFile = (bucketName, folderName, filename, secretName) => {
  return new Promise((resolve, reject) => {
    secretManager.getSecret(secretName)
      .then(keyFile => {
        const storageWithCredentials = new Storage({
          projectId: process.env.GCP_PROJECT_ID,
          credentials: keyFile
        })
        storageWithCredentials.bucket(bucketName).file(`${folderName}/${filename}`).delete()
          .then(() => {
            console.log(`${folderName}/${filename} deleted from ${bucketName}.`)
            resolve()
          })
          .catch((err) => {
            console.error('ERROR:', err)
            reject(err)
          })
      })
      .catch((err) => {
        console.error(`Error secret: ${err}`)
        reject(err)
      })
  })
}

module.exports = {
  deleteFile: deleteFile
}