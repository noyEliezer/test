var Promise = require('promise')
var db = require('../../../../db/index')

deleteUser = (data) => {
  return new Promise((resolve, reject) => {
    try {
      db.query('BEGIN')
        .then(() => {
          return db.query(`SELECT location_id FROM dim_users 
                           WHERE user_name = $1 AND
                                 email = $2 AND
                                 company_id = $3`, [data.user_name, data.email, data.company_id])
        })
        .then((result) => {
          if(result.rows.length == 0) {
            throw new Error('User not found');
          }
          const locationId = result.rows[0].location_id;
          return db.query(`DELETE FROM dim_users 
                           WHERE user_name = $1 AND
                                 email = $2 AND
                                 company_id = $3`, [data.user_name, data.email, data.company_id])
            .then(() => {
              return db.query(`DELETE FROM dim_locations WHERE location_id = $1`, [locationId])
            })
        })
        .then(() => {
          return db.query('COMMIT')
        })
        .then(() => {
          resolve({
            httpCode: 200,
            answer: "Deleted user successfully"
          })
        })
      .catch((err) => {
        db.query('ROLLBACK')
          .then(() => {
            reject({
              httpCode: 500,
              answer: `Error during deleting user: ${err}`
            })
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
  deleteUser: deleteUser
}