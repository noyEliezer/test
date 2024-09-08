const express = require('express')
const getSingleGuideRouter = express.Router()
const cors = require('cors')
const userController = require('../../../../controllers/users/user/index')
const {
  verifyToken
} = require('../../../../utils/autohrization/jwt')
const {
  authorizeRole
} = require('../../../../utils/autohrization/role')


getSingleGuideRouter.use(cors())

getSingleGuideRouter.put('/guides/getSingleGuide', verifyToken, authorizeRole(['administrator', 'manager', 'maintainance']), (req, res) => {
  userController.getSingleGuide(req, res)
})

module.exports = getSingleGuideRouter