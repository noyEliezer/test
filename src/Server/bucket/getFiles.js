const {
  Storage
} = require('@google-cloud/storage')
const secretManager = require('../secretManager/index')

getFiles = (bucketName, offset, limit, companyId, secretName) => {
  return new Promise((resolve, reject) => {
    secretManager.getSecret(secretName)
      .then(keyFile => {
        const storageWithCredentials = new Storage({
          projectId: process.env.GCP_PROJECT_ID,
          credentials: keyFile
        })

        const options = {
          prefix: `companyID - ${companyId}/`
        }

        storageWithCredentials.bucket(bucketName)
          .getFiles(options)
          .then((data) => {
            const files = data[0]
            let filteredFilesNames = files.map((file) => file.name.split('/').pop())
            filteredFilesNames = filteredFilesNames.filter(val => val !== "")
            filteredFilesNames = filteredFilesNames.slice(offset, offset + limit)
            resolve(filteredFilesNames)
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
  getFiles: getFiles
}