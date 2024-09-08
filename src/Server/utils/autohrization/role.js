const db = require("../../db/index")

authorizeRole = (allowedRoles) => {
  return (req, res, next) => {
    db.query(`SELECT role FROM dim_users 
              WHERE user_Id = ${req.user.userId} AND
                    user_name = '${req.user.userName}' AND
                    company_id = ${req.user.companyId}`)
      .then((result) => {
        if (result.rows.length === 0) {
          return res.status(401).json({
            error: 'User not found'
          })
        }
        const userRole = result.rows[0].role
        if (allowedRoles.includes(userRole)) {
          return next()
        }
        return res.status(403).json({
          error: 'User not authorized'
        })
      })
      .catch((error) => {
        console.error(`Error authorizing role: ${error}`)
        return res.status(500).json({
          error: 'Internal server error'
        })
      })
  }
}

module.exports = {
  authorizeRole: authorizeRole
}