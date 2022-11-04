const { readFile } = require('fs/promises');
const path = require('path');

const pathFile = path.resolve(__dirname, 'talker.json');

const readAllFiles = async () => {
  const talkerData = await readFile(pathFile, { encoding: 'utf-8' });
  return JSON.parse(talkerData);
};

module.exports = { 
  readAllFiles,
};