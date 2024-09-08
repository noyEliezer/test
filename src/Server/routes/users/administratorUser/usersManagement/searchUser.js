const express = require('express')
const searchUserRouter = express.Router()
const cors = require('cors')
const administratorUserController = require('../../../../controllers/users/administratorUser/index')
const {
  verifyToken
} = require('../../../../utils/autohrization/jwt')
const {
  authorizeRole
} = require('../../../../utils/autohrization/role')


searchUserRouter.use(cors())

searchUserRouter.patch('/users/searchUser', verifyToken, authorizeRole(['administrator']), (req, res) => {
  administratorUserController.searchUser(req, res)
})

module.exports = searchUserRouter