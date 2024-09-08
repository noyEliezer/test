const express = require('express')
const getGuidesRouter = express.Router()
const cors = require('cors')
const userController = require('../../../../controllers/users/user/index')
const {
  verifyToken
} = require('../../../../utils/autohrization/jwt')
const {
  authorizeRole
} = require('../../../../utils/autohrization/role')


getGuidesRouter.use(cors())

getGuidesRouter.get('/guides/getGuides', verifyToken, authorizeRole(['administrator', 'manager', 'maintainance']), (req, res) => {
  userController.getGuides(req, res)
})

module.exports = getGuidesRouter