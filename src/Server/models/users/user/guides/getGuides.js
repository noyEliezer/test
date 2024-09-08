const db = require('../../../../db/index');
const bucket = require('../../../../bucket')

getGuides = (decodedToken, query) => {
  return new Promise((resolve, reject) => {
    try {
      result = db.query(`SELECT * FROM fact_guides
                         WHERE company_id = ${decodedToken.companyId}
                         ORDER BY guide_id
                         OFFSET ${query.OFFSET}
                         LIMIT ${query.LIMIT}`);

      result.then((answer) => {
        let guides = answer.rows.map(row => {
          const entries = Object.entries(row).filter(([key]) => key !== 'company_id');
          return Object.fromEntries(entries);
        });

        const bucketName = 'maint_control_guides_bucket';
        const secretName = process.env.guides_bucket_secret;
        const offset = query.OFFSET;
        const limit = query.LIMIT;

        bucket.getFiles(bucketName, offset, limit, decodedToken.companyId, secretName)
          .then((files) => {
            guides.forEach((guide, index) => {
              guide.file_name = files[index];
            });

            resolve({
              httpCode: 200,
              answer: guides
            });
          })
          .catch((err) => {
            reject({
              httpCode: 500,
              answer: `Error during getting files: ${err}`
            });
          });
      })
      .catch((err) => {
        reject({
          httpCode: 500,
          answer: `Error during getting guides: ${err}`
        });
      });
    } catch (error) {
      reject({
        httpCode: 500,
        answer: "Internal server error"
      });
    }
  });
}

module.exports = {
  getGuides: getGuides
}