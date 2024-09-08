var Promise = require('promise')
const bucket = require('../../../../bucket/index')
const db = require('../../../../db/index')

deleteGuide = (decodedToken, data) => {
  return new Promise((resolve, reject) => {
    try {

      const bucketName = 'maint_control_guides_bucket'
      const folderName = `companyID - ${decodedToken.companyId}`
      const secretName = process.env.guides_bucket_secret

      bucket.deleteFile(bucketName, folderName, data.file_name, secretName)
        .then(() => {
          result = db.query(`DELETE FROM fact_guides WHERE
				  	        guide_id = ${data.guide_id} AND
				  	        file_name = '${data.file_name}' AND
				  	        company_id = ${decodedToken.companyId}`)
            result.then(()=>{
              resolve({
                httpCode: 200,
                answer: "deleted guide succesfuly"
              })
            }).catch(()=>{
              reject({
                httpCode: 500,
                answer: `Error during deleting guide: ${err}`
              })    
            })          
        })
        .catch((err) => {
          reject({
            httpCode: 500,
            answer: `Error during deleting guide: ${err}`
          })
        })
    } catch (error) {
      reject({
        httpCode: 500,
        answer: "Internal server error"
      })
    }
  })
}

module.exports = {
  deleteGuide: deleteGuide
}