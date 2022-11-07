const express = require('express');
const path = require('path');

const { writeFile } = require('fs/promises');

const { readAllFiles } = require('../utils');

const { createNewTalker } = require('../utils');

const { validToken } = require('../middleware/validToken');

const { validAge, validName,
  validTalk, validRate, validWatchedAt } = require('../middleware/validTalkers');

const router = express.Router();

const pathFile = path.resolve(__dirname, '..', 'talker.json');

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

router.post('/', validToken,
  validName, validAge, validTalk, validRate, validWatchedAt, async (req, res) => {
  const talker = req.body;
  const newTalker = await createNewTalker(talker);
  return res.status(201).send({ ...newTalker });
});

router.put('/:id', validToken, validName,
  validAge, validTalk, validRate, validWatchedAt, async (req, res) => {
  const talkers = await readAllFiles();
  const id = Number(req.params.id);
  const findTalker = talkers.find((t) => t.id === id);
  if (findTalker) {
    const index = talkers.indexOf(findTalker);
    const updateTalker = { id, ...req.body };
    talkers.splice(index, 1, updateTalker);
    await writeFile(pathFile, JSON.stringify(talkers));
    res.status(200).json(updateTalker);
  } else {
    res.status(400);
  }
});

module.exports = router;