var Promise = require('promise')
var db = require('../../../../db/index')

updateUser = (data, decodedToken) => {
  return new Promise((resolve, reject) => {
    db.query('BEGIN')
      .then(() => {
        return db.query(`SELECT location_id FROM dim_users WHERE user_id = $1 AND company_id = $2`, 
          [data.user_id, decodedToken.companyId])
      })
      .then((res) => {
        const locationId = res.rows[0].location_id;
        return db.query(`UPDATE dim_locations 
          SET address_name = $1,
              city = $2,
              country = $3,
              latitude = $4,
              longitude = $5,
              zone_name = $6
          WHERE location_id = $7`, 
          [data.location.address_name, data.location.city, data.location.country, data.location.latitude, data.location.longitude, data.location.zone_name, locationId])
      })
      .then(() => {
        return db.query(`UPDATE dim_users 
          SET user_name = $1,
              first_name = $2,
              last_name = $3,
              email = $4,
              password = $5,
              phone = $6,
              role = $7
          WHERE user_id = $8 AND 
          company_id = $9`, 
          [data.user_name, data.first_name, data.last_name, data.email, data.password, data.phone, data.role, data.user_id, decodedToken.companyId])
      })
      .then(() => {
        return db.query('COMMIT')
      })
      .then(() => {
        resolve({
          httpCode: 200,
          answer: "Updated user successfully"
        });
      })
      .catch((err) => {
        db.query('ROLLBACK');
        reject({
          httpCode: 500,
          answer: `Error during updating user: ${err}`
        });
      });
  });
}

module.exports = {
  updateUser: updateUser
}