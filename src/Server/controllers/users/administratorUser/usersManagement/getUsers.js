const administratorUser = require('../../../../models/users/administratorUser/index')

module.exports = {
  getUsers: (req, res) => {
    administratorUser.getUsers(req.user, req.query)
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