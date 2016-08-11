const jwt = require('jsonwebtoken');

//TODO: Get this variable stashed somewhere better. But maybe do this last because my windows dev environment is weirdly cantankerous.
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
