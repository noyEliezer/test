const managerUser = require('../../../../models/users/user/index')

module.exports = {
  getSingleGuide: (req, res) => {
    managerUser.getSingleGuide(req.user, req.body)
      .then((result) => {
        return res.status(result.httpCode).json({
          answer: result.answer
        })
      })
      .catch((err) => {
        return res.status(err.httpCode).json({
          error: err.answer
        })
      })
  }
}