const validToken = (req, res, next) => {
  const header = req.headers;
  if (!Object.keys(header).includes('authorization')) {
    return res.status(401).json({ message: 'Token não encontrado' });
  } if (header.authorization.length !== 16 || typeof header.authorization !== 'string') {
    return res.status(401).json({ message: 'Token inválido' });
  }
  next();
};

module.exports = {
  validToken,
};