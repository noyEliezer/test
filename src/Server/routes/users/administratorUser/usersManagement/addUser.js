const express = require('express')
const addUserRouter = express.Router()
const cors = require('cors')
const administratorUserController = require('../../../../controllers/users/administratorUser/index')
const {
  verifyToken
} = require('../../../../utils/autohrization/jwt')
const {
  authorizeRole
} = require('../../../../utils/autohrization/role')


addUserRouter.use(cors())

addUserRouter.post('/users/addUser', verifyToken, authorizeRole(['administrator']), (req, res) => {
  administratorUserController.addUser(req, res)
})

module.exports = addUserRouter