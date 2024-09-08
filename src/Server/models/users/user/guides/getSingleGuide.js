const db = require('../../../../db/index');
const bucket = require('../../../../bucket');

getSingleGuide = (decodedToken, data) => {
  return new Promise((resolve, reject) => {
    try {
      console.log('got to the single model');
      result = db.query(`SELECT * FROM fact_guides
                         WHERE company_id = ${decodedToken.companyId}
                         AND guide_id = ${data.guide_id}`);

      result.then((answer) => {
        console.log(answer);
        let guide = answer.rows.map(row => {
          const entries = Object.entries(row).filter(([key]) => key !== 'company_id');
          return Object.fromEntries(entries);
        });

        resolve({
          httpCode: 200,
          answer: guide
        });
      })
      .catch((err) => {
        reject({
          httpCode: 500,
          answer: `Error during getting guide: ${err}`
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
  getSingleGuide: getSingleGuide
}
