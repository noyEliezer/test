const administratorUser = require('../../../../models/users/administratorUser/index')

module.exports = {
  updateUser: (req, res) => {
    administratorUser.updateUser(req.body, req.user)
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