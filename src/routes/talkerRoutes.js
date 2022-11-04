const express = require('express');

const { readAllFiles } = require('../readFile');

const router = express.Router();

router.get('/', async (_req, res) => {
  const response = await readAllFiles();
  return res.status(200).json(response);
});

router.get('/:id', async (req, res) => {
  const response = await readAllFiles();
  const id = Number(req.params.id);
  const talker = response.find((t) => t.id === id);
  console.log(talker);
  if (talker) {
    res.status(200).json(talker);
  } else {
    res.status(404).json({
      message: 'Pessoa palestrante não encontrada',
    });
  }
});

module.exports = router;