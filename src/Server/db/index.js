const {
  Client
} = require('pg')
let myClient = null

const connectMaintControlDB = () => {
  return new Promise((resolve, reject) => {
    try {
      const client = new Client({
        host: process.env.HOST,
        user: process.env.USER,
        port: process.env.DB_PORT,
        password: process.env.PASSWORD,
        database: process.env.DATABASE,
      })

      client.connect(function (err) {
        if (err) {
          console.log('err db connection ===> ' + err)
          setTimeout(connectMaintControlDB, 5000)
        } else {
          myClient = client
          console.log('SUCCESS: connected to MaintControlDB')
          resolve()
        }
      })
    } catch (error) {
      console.log(`DB CONNECTION FAILURE: ${error}`)
      setTimeout(connectMaintControlDB, 5000)
    }
  })
}

const query = (queryText, values = []) => {
  return new Promise((resolve, reject) => {
    try {
      const result = myClient.query(queryText, values)
      resolve(result)
    } catch (error) {
      reject(error)
    }
  })
}

module.exports = {
  connectMaintControlDB: connectMaintControlDB,
  query: query
}