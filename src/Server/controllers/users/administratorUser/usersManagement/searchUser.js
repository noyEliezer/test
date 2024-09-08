const administratorUser = require('../../../../models/users/administratorUser/index')

module.exports = {
  searchUser: (req, res) => {
    administratorUser.searchUser(req.user, req.body)
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