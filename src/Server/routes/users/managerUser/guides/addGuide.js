const express = require('express')
const addGuideRouter = express.Router()
const cors = require('cors')
const managerUserController = require('../../../../controllers/users/managerUser/index')
const {
  verifyToken
} = require('../../../../utils/autohrization/jwt')
const {
  authorizeRole
} = require('../../../../utils/autohrization/role')


addGuideRouter.use(cors())

addGuideRouter.post('/guides/addGuide', verifyToken, authorizeRole(['administrator', 'manager']), (req, res) => {
  managerUserController.addGuide(req, res)
})

module.exports = addGuideRouter