const user = require('../../../../models/users/user/index')

module.exports = {
  login: (req, res) => {
    user.login(req.body)
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