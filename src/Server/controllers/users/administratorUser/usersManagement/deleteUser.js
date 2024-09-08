const administratorUser = require('../../../../models/users/administratorUser/index')

module.exports = {
  deleteUser: (req, res) => {
    administratorUser.deleteUser(req.body)
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