var Promise = require('promise')
var db = require('../../../../db/index')

getUserSettings = (decodedToken) => {
  return new Promise((resolve, reject) => {
    try {
      result = db.query(`SELECT * FROM dim_users WHERE 
                        user_id='${decodedToken.userId}'`)

      result.then((answer) => {
          const entries = Object.entries(answer.rows[0]).filter(([key]) => key !== 'user_id' && key !== 'password')
          const settings = Object.fromEntries(entries)
          resolve({
            httpCode: 200,
            answer: settings
          })
        })
        .catch((err) => {
          reject({
            httpCode: 500,
            answer: `Error recieving user settings: ${err}`
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

isUserExist = (answer) => {
  return answer.rowCount == 1 ? true : false
}

module.exports = {
  getUserSettings: getUserSettings
}