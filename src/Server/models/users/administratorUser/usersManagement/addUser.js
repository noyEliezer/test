var Promise = require('promise')
var db = require('../../../../db/index')
const CryptoJS = require("crypto-js");

encryptPassword = (i_Name, i_Password) => {      
      const key = CryptoJS.enc.Hex.parse(i_Name);
      const iv = CryptoJS.enc.Hex.parse('0123456789abcdef0123456789abcdef');
      const encrypted = CryptoJS.AES.encrypt(i_Password, key, { iv: iv });
      return encrypted.ciphertext.toString(CryptoJS.enc.Base64);          
}

addUser = (data) => {
  return new Promise((resolve, reject) => {
    let locationId = null;

    db.query('BEGIN')
      .then(() => {
        // check if user already exists
        return db.query(`SELECT * FROM dim_users WHERE email = $1`, [data.email])
      })
      .then((res) => {
        if (res.rowCount > 0) {
          // if user exists, resolve with an appropriate message
          resolve({
            httpCode: 409,
            answer: "User already exists"
          });
        } else {
          // if user does not exist, check if the location exists
          return db.query(`SELECT location_id FROM dim_locations WHERE address_name = $1 AND city = $2 AND country = $3 AND latitude = $4 AND longitude = $5 AND zone_name = $6`,
            [data.location.address_name, data.location.city, data.location.country, data.location.latitude, data.location.longitude, data.location.zone_name])
        }
      })
      .then((res) => {
        if (res.rowCount > 0) {
          // if location exists, save location_id
          locationId = res.rows[0].location_id;
          // skip to inserting user
          return Promise.resolve(locationId);
        } else {
          // if location does not exist, add it
          return db.query(`INSERT INTO dim_locations (address_name, city, country, latitude, longitude, zone_name) VALUES (
            $1, $2, $3, $4, $5, $6) RETURNING location_id`,
            [data.location.address_name, data.location.city, data.location.country, data.location.latitude, data.location.longitude, data.location.zone_name])
        }
      })
      .then((res) => {        
        if (res === undefined) {
          // if a new location was added, save location_id
          locationId = res.rows[0].location_id;
        }        
        
        let encryptedPassword = encryptPassword(data.user_name, data.password)

        // insert the user
        return db.query(`INSERT INTO dim_users (
          user_name,
          first_name,
          last_name,
          email,
          password,
          phone,
          role,
          company_id,
          location_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
          [data.user_name, data.first_name, data.last_name, data.email, encryptedPassword, data.phone, data.role, data.company_id, locationId])
      })
      .then(() => {
        return db.query('COMMIT')
      })
      .then(() => {
        resolve({
          httpCode: 200,
          answer: "Added user successfully"
        });
      })
      .catch((err) => {
        db.query('ROLLBACK');
        reject({
          httpCode: 500,
          answer: `Error during adding user: ${err}`
        });
      });
  });
}

module.exports = {
  addUser: addUser
}