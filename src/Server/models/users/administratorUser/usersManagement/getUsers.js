var Promise = require('promise')
var db = require('../../../../db/index')

getUsers = (decodedToken, query) => {
  return new Promise((resolve, reject) => {
    try {
      result = db.query(`SELECT dim_users.user_id, dim_users.user_name, dim_users.first_name,
                                dim_users.last_name, dim_users.email, dim_users.phone, 
                                dim_users.role, dim_users.company_id, dim_locations.* 
                         FROM dim_users
                         JOIN dim_locations ON dim_users.location_id = dim_locations.location_id
                         WHERE dim_users.company_id = $1 AND
                         dim_users.user_id != $2
                         ORDER BY dim_users.user_id
                         OFFSET $3
                         LIMIT $4`, 
                         [decodedToken.companyId, decodedToken.userId, query.OFFSET, query.LIMIT])

      result.then((answer) => {
          resolve({
            httpCode: 200,
            answer: answer.rows
          })
        })
        .catch((err) => {
          reject({
            httpCode: 500,
            answer: `Error during receiving users: ${err}`
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
  getUsers: getUsers
}