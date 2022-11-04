const { readFile } = require('fs/promises');
const path = require('path');

const pathFile = path.resolve(__dirname, 'talker.json');

const readAllFiles = async () => {
  const response = await readFile(pathFile, { encoding: 'utf-8' });
  return JSON.parse(response);
};

module.exports = { 
  readAllFiles,
};