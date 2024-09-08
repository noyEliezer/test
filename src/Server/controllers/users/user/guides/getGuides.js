const managerUser = require('../../../../models/users/user/index')

module.exports = {
  getGuides: (req, res) => {
    managerUser.getGuides(req.user, req.query)
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