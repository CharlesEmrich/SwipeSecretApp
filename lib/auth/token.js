const jwt = require('jsonwebtoken');
const secret = process.env.SECRET || 'cutepuppydogs';

module.exports = {

  sign(user){
    return new Promise((resolve, reject)=>{
      const payload = {
        id: user._id
      };
      jwt.sign(payload, secret, null, (err, token)=>{
        if (err) return reject(err);
        resolve(token);
      });
    });
  },

  verify(token){
    return new Promise((resolve, reject)=>{
      jwt.verify(token, secret, (err, payload)=>{
        if (err) return reject(err);
        resolve(payload);
      });
    });
  }
};
