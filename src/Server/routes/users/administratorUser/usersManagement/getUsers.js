const express = require('express')
const getUsersRouter = express.Router()
const cors = require('cors')
const administratorUserController = require('../../../../controllers/users/administratorUser/index')
const {
  verifyToken
} = require('../../../../utils/autohrization/jwt')
const {
  authorizeRole
} = require('../../../../utils/autohrization/role')

getUsersRouter.use(cors())

getUsersRouter.get('/users/getUsers', verifyToken, authorizeRole(['administrator']), (req, res) => {
  administratorUserController.getUsers(req, res)
})

module.exports = getUsersRouter