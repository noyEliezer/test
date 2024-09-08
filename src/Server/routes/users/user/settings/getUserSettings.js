const express = require('express')
const cors = require('cors')
const getUserSettingsRouter = express.Router()
const userController = require('../../../../controllers/users/user/index')
const db = require('../../../../db')

getUserSettingsRouter.use(cors())

getUserSettingsRouter.get('/users/getUserSettings', verifyToken, (req, res) => {
  userController.getUserSettings(req, res)
})

module.exports = getUserSettingsRouter
