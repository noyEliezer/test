const express = require('express')
const db = require('./db/index')
const fs = require("fs")
require('dotenv').config()

// connect middlware
const app = express()
app.use(express.json())

const getDirectories = (path) => {
  let directories = []
  fs.readdirSync(path).forEach((file) => {
    const fullPath = path + '/' + file
    if (fs.statSync(fullPath).isDirectory()) {
      directories.push(fullPath)
      directories = directories.concat(getDirectories(fullPath))
    }
  })
  return directories
}

const directories = getDirectories('./routes')
directories.forEach((directory) => {
  fs.readdir(directory, (err, files) => {
    files.forEach((file) => {
      const filePath = directory + '/' + file
      if (fs.statSync(filePath).isFile()) {
        app.use('/', require(filePath))
      }
    })
  })
})

//connect db
db.connectMaintControlDB()

//start server
app.listen(process.env.APP_PORT, () => {
  console.log(`Server listening on port ${process.env.APP_PORT}`)
})