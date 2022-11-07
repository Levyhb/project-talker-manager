const { readFile, writeFile } = require('fs/promises');
const path = require('path');

const pathFile = path.resolve(__dirname, '..', 'talker.json');

const readAllFiles = async () => {
  const response = await readFile(pathFile, { encoding: 'utf-8' });
  return JSON.parse(response);
};

const getTalkerId = async () => {
  const talkers = await readAllFiles();
  const higherId = talkers[talkers.length - 1].id;
  return higherId;
};

const createNewTalker = async (newTalker) => {
  const talkers = await readAllFiles();
  const newId = await getTalkerId();
  const addNewTalker = {
    name: newTalker.name,
    age: newTalker.age,
    id: newId + 1,
    talk: newTalker.talk,
  };
  const updateTalkers = [...talkers, addNewTalker];
  await writeFile(pathFile, JSON.stringify(updateTalkers));
  return addNewTalker;
};

module.exports = { 
  readAllFiles,
  createNewTalker,
};