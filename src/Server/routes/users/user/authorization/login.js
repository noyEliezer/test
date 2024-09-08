const express = require('express')
const cors = require('cors')
const loginRouter = express.Router()
const userController = require('../../../../controllers/users/user/index')
const db = require('../../../../db')

loginRouter.use(cors())

loginRouter.post('/users/login', (req, res) => {
  userController.login(req, res)
})

module.exports = loginRouter
