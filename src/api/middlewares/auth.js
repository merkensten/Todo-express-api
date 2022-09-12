import jwt from 'jsonwebtoken';
import { UnAuthenticatedError } from '../errors/index.js';

const auth = async (req, res, next) => {
  try {
    // Hämta in headers från request, det är authorization headern som är intressant i detta fallet
    const authHeaders = req.headers.authorization;

    // Kolla om authorization headern inte är satt eller om den inte startar med "Bearer", om det inte gör det så kastar vi ett error
    if (!authHeaders || !authHeaders.startsWith('Bearer ')) {
      throw new UnAuthenticatedError('Autentication is required');
    }
    const token = authHeaders.split(' ')[1];

    // Hämta ut payloaden från tokenen, jwt.verify tar in token och secret som argument
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    if (!payload) {
      throw new UnAuthenticatedError('Autentication is required');
    }

    // Lägg till payloaden i requesten
    req.user = payload;
  } catch (error) {
    res.status(401).json({
      message: error.message,
    });
  }
  next();
};

export default auth;
