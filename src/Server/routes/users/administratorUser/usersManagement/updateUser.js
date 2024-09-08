const express = require('express')
const updateUserRouter = express.Router()
const cors = require('cors')
const {
  verifyToken
} = require('../../../../utils/autohrization/jwt')
const administratorUserController = require('../../../../controllers/users/administratorUser/index')
const {
  authorizeRole
} = require('../../../../utils/autohrization/role')

updateUserRouter.use(cors())

updateUserRouter.put('/users/updateUser', verifyToken, authorizeRole(['administrator']), (req, res) => {
  administratorUserController.updateUser(req, res)
})

module.exports = updateUserRouter