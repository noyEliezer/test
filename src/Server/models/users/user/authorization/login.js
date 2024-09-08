var Promise = require('promise')
var db = require('../../../../db/index')
const {
  generateAccessToken
} = require('../../../../utils/autohrization/jwt')
const CryptoJS = require("crypto-js");

function encryptPassword(i_Name, i_Password) 
{
  return new Promise((resolve, reject) => {
    try {
      const key = CryptoJS.enc.Hex.parse(i_Name);
      const iv = CryptoJS.enc.Hex.parse('0123456789abcdef0123456789abcdef');
      const encrypted = CryptoJS.AES.encrypt(i_Password, key, { iv: iv });
      resolve(encrypted.ciphertext.toString(CryptoJS.enc.Base64));      
    } catch (error) {
      reject(error)
    }
  })
}

function login(data) {
  return new Promise((resolve, reject) => {
    db.query(`SELECT * FROM dim_users WHERE user_name='${data.user_name}' AND company_id=${data.company_id}`)
      .then(result => {
        if (result.rowCount === 1) {
          const user = result.rows[0];
          encryptPassword(user.user_name, data.password)
            .then(encryptedPassword => {
              if (encryptedPassword === user.password) {
                const payload = {
                  userId: user.user_id,
                  userName: user.user_name,
                  companyId: user.company_id
                };
                generateAccessToken(payload)
                  .then(token => {
                    resolve({
                      httpCode: 201,
                      answer: {
                        token: token,
                        role: user.role
                      }
                    });
                  })
                  .catch(err => {
                    reject({
                      httpCode: 500,
                      answer: 'Internal server error'
                    });
                  });
              } else {
                resolve({
                  httpCode: 401,
                  answer: 'Incorrect password'
                });
              }
            })
            .catch(err => {
              reject({
                httpCode: 500,
                answer: 'Internal server error'
              });
            });
        } else {
          resolve({
            httpCode: 401,
            answer: 'User not found'
          });
        }
      })
      .catch(err => {
        console.log(err);
        reject({
          httpCode: 500,
          answer: 'Internal server error'
        });
      });
  });
}

module.exports = {
  login: login
};
