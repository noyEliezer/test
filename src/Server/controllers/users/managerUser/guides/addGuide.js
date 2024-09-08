const managerUser = require('../../../../models/users/managerUser/index')

module.exports = {
  addGuide: (req, res) => {
    managerUser.addGuide(req.user, req)
      .then((result) => {
        return res.status(result.httpCode).json({
          answer: result.answer
        })
      })
      .catch((err) => {
        return res.status(err.httpCode).json({
          error: err.answer,
        })
      })
  }
}
