const express = require('express')
const deleteUserRouter = express.Router()
const cors = require('cors')
const administratorUserController = require('../../../../controllers/users/administratorUser/index')
const {
  verifyToken
} = require('../../../../utils/autohrization/jwt')
const {
  authorizeRole
} = require('../../../../utils/autohrization/role')

deleteUserRouter.use(cors())

deleteUserRouter.delete('/users/deleteUser', verifyToken, authorizeRole(['administrator']), (req, res) => {
  administratorUserController.deleteUser(req, res)
})

module.exports = deleteUserRouter