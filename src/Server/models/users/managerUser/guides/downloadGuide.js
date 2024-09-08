const Promise = require('promise');
const bucket = require('../../../../bucket');
const path = require('path');

downloadGuide = (decodedToken, data) => {
  return new Promise((resolve, reject) => {
    try {
      const bucketName = 'maint_control_guides_bucket';
      const srcFilename = `companyID - ${decodedToken.companyId}/${data.file_name}`;
      const secretName = process.env.guides_bucket_secret
      
      bucket.downloadFile(bucketName, srcFilename, secretName)
        .then((signedUrl) => {
          resolve({
            httpCode: 200,
            answer: signedUrl
          })
        })
        .catch((err) => {
          reject({
            httpCode: 500,
            answer: `Error getting signed URL`
          });
        })
      
    } catch (error) {
      reject({
        httpCode: 500,
        answer: "Internal server error"
      });
    }
  });
}

module.exports = {
  downloadGuide: downloadGuide
}