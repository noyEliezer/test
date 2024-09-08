const fs = require('fs')
const path = require('path')
const Busboy = require('busboy')
const fileType = require('file-type')
const bucket = require('../../../../bucket/index')
var db = require('../../../../db/index')

addGuide = (decodedToken, req) => {
  return new Promise((resolve, reject) => {
    try {
      const busboy = Busboy({
        headers: req.headers
      })
      let filename = ''
      let mimetype = ''
      let saveTo = ''
      let title = ''
      let description = ''
      let signedUrl
      let date

      busboy.on('file', (fieldname, file, originalname) => {
        const now = new Date()
        date = now.toLocaleDateString('he-IL')
        const time = new Intl.DateTimeFormat('he-IL', {hour: 'numeric', minute: 'numeric', second: 'numeric', timeZone: 'Asia/Jerusalem'}).format(now)
        filename = `${originalname.filename} - ${date} - ${time}`

        // Get the file type from the buffer
        const chunks = []
        file.on('data', chunk => chunks.push(chunk))
        file.on('end', () => {
          const buffer = Buffer.concat(chunks)
          const type = fileType(buffer)
          mimetype = type?.mime
          saveTo = path.join('/tmp', filename)
          fs.writeFileSync(saveTo, buffer)
        })
      })

      busboy.on('field', (fieldname, val, fieldnameTruncated, valTruncated, encoding, mimetype) => {
        if (fieldname === 'title') {
          title = val
        }
        if (fieldname === 'description') {
          description = val
        }
      })

      const bucketName = 'maint_control_guides_bucket'
      const folderName = `companyID - ${decodedToken.companyId}`
      const secretName = process.env.guides_bucket_secret

      busboy.on('finish', () => {
        db.query('BEGIN')        
        .then(() => {
          return bucket.uploadFile(
            bucketName,
            saveTo,
            folderName,
            filename,
            mimetype,
            secretName
          )
        })
        .then((url) => {
          signedUrl = url
          return db.query(
            'INSERT INTO fact_guides (title, description, file_name, file_path, added_date, company_id) VALUES ($1, $2, $3, $4, $5, $6)',
            [title, description, filename, signedUrl, date, decodedToken.companyId]
          )
        })
        .then(() => {
          return db.query('COMMIT')
        })
        .then(() => {
          resolve({
            httpCode: 200,
            answer: 'Added guide successfully'
          })
        })
        .catch((err) => {
          // If an error occurs, rollback the transaction and delete the uploaded file from the bucket
          db.query('ROLLBACK')
          .then(() => bucket.deleteFile(bucketName, folderName, filename, secretName))
          .then(() => {
            reject({
              httpCode: 500,
              answer: `Error during adding guide: ${err}`
            })
          })
        })
      })

      req.pipe(busboy)
    } catch (error) {
      reject({
        httpCode: 500,
        answer: 'Internal server error: ' + error,
      })
    }
  })
}

module.exports = {
  addGuide: addGuide
}
