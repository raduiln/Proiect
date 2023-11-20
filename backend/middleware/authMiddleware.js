const jwt = require('jsonwebtoken');
const secret = "mysecretkey"; // Cheia secretă pentru decriptarea token-ului

// Middleware pentru verificarea tokenului JWT
function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: 'Token lipsă. Autentificare necesară.' });
  }

  const access_token = authHeader.split(' ')[1];

  jwt.verify(access_token, secret, (err, decodedToken) => {
    if (err) {
      return res.status(401).json({ error: 'Token invalid sau expirat. Autentificare necesară.' });
    }

    // Adăugăm informațiile din token la obiectul `req` pentru a le folosi în alte rute
    req.user = decodedToken;
    next();
  });
}

module.exports = authMiddleware;
