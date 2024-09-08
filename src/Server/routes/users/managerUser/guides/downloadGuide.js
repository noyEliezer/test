const express = require('express')
const downloadGuideRouter = express.Router()
const cors = require('cors')
const managerUserController = require('../../../../controllers/users/managerUser/index')
const {
  verifyToken
} = require('../../../../utils/autohrization/jwt')
const {
  authorizeRole
} = require('../../../../utils/autohrization/role')


downloadGuideRouter.use(cors())

downloadGuideRouter.put('/guides/downloadGuide', verifyToken, authorizeRole(['administrator', 'manager']), (req, res) => {
  managerUserController.downloadGuide(req, res)
})

module.exports = downloadGuideRouter