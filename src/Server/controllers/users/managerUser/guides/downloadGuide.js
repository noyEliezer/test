const managerUser = require('../../../../models/users/managerUser/index');

module.exports = {
  downloadGuide: (req, res) => {
    managerUser.downloadGuide(req.user, req.body)
      .then((result) => {
        return res.status(result.httpCode).json({
          answer: result.answer
        })
      })
      .catch((err) => {
        return res.status(err.httpCode).json({
          error: `Error during downloading guide`
        })
      })
  }
}
