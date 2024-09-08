const express = require('express')
const deleteGuideRouter = express.Router()
const cors = require('cors')
const managerUserController = require('../../../../controllers/users/managerUser/index')
const {
  verifyToken
} = require('../../../../utils/autohrization/jwt')
const {
  authorizeRole
} = require('../../../../utils/autohrization/role')


deleteGuideRouter.use(cors())

deleteGuideRouter.delete('/guides/deleteGuide', verifyToken, authorizeRole(['administrator', 'manager']), (req, res) => {
  managerUserController.deleteGuide(req, res)
})

module.exports = deleteGuideRouter