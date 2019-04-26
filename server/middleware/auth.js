import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
class Authorization {
  static authorization(req, res, next) {
    const token = req.headers.authorization;
    if (!token || token === ' ') {
      return res.status(401).json({
        status: 401,
        message: 'You are not Authorized',
      });
    }
    jwt.verify(token, process.env.SECRETKEY, (err, decode) => {
      if (err) {
        res.status(401).json({
          err,
        });
      } else {
        req.user = decode;
        next();
      }
    });
  }
}


export default Authorization;
