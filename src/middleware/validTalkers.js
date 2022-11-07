const validName = (req, res, next) => {
  const data = req.body;
  if (!data.name) {
      return res.status(400).json({ message: 'O campo "name" é obrigatório' });
  } if (data.name.length < 3) {
    return res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  } 
  next();
};

const validAge = (req, res, next) => {
  const data = req.body;
  if (!data.age) {
    return res.status(400).json({ message: 'O campo "age" é obrigatório' });
  } if (data.age < 18) {
    return res.status(400).json({ message: 'A pessoa palestrante deve ser maior de idade' });
  }
  next();
};

const validTalk = (req, res, next) => {  
  const data = req.body;
  if (!data.talk) {
    return res.status(400).json({ message: 'O campo "talk" é obrigatório' });
  } 
  next();
};

const validWatchedAt = (req, res, next) => {
  const { watchedAt } = req.body.talk;
  const isFormatDate = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/i;
  if (!watchedAt) {
    return res.status(400).json({ message: 'O campo "watchedAt" é obrigatório' });
  } if (!isFormatDate.test(watchedAt)) {
    return res.status(400).json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }
  next();
};

const validateRate = (rate) => {
    const valid = rate < 1 || rate > 5 || !Number.isInteger(rate);
    return valid;
};

const validRate = (req, res, next) => {
  const { rate } = req.body.talk;
  if (('rate' in req.body.talk) && validateRate(rate)) {
    return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5',
  });
  } if (!('rate' in req.body.talk)) {
    return res.status(400).json({ message: 'O campo "rate" é obrigatório' });
  } 
  next();
};

module.exports = {
  validName,
  validAge,
  validTalk,
  validRate,
  validWatchedAt,
};