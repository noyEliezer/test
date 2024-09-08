var Promise = require('promise')
var db = require('../../../../db/index')

searchUser = (decodedToken, data) => {
  return new Promise((resolve, reject) => {
    try {
      result = db.query(`SELECT dim_users.*, dim_locations.* FROM dim_users
                         JOIN dim_locations ON dim_users.location_id = dim_locations.location_id
                         WHERE dim_users.company_id = $1
                         AND dim_users.user_id != $2
                         AND (dim_users.first_name ILIKE $3 
                              OR dim_users.last_name ILIKE $4 
                              OR dim_users.email ILIKE $5 
                              OR dim_users.phone ILIKE $6)
                         ORDER BY dim_users.user_id`,
                         [decodedToken.companyId, decodedToken.userId, '%' + data.search_term + '%', '%' + data.search_term + '%', '%' + data.search_term + '%', '%' + data.search_term + '%'])

      result.then((answer) => {
          resolve({
            httpCode: 200,
            answer: answer.rows
          })
        })
        .catch((err) => {
          reject({
            httpCode: 500,
            answer: `Error during searching user: ${err}`
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
  searchUser: searchUser
}