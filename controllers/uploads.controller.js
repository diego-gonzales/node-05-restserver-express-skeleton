const { request, response } = require('express');
const { uploadMyFile } = require('../helpers/upload-file');

const uploadFile = async (req = request, res = response) => {
  const { files } = req;
  if (!files || Object.keys(files).length === 0 || !files.myFile) {
    res.status(400).json({ ok: false, msg: 'No files were uploaded' });
    return;
  }

  try {
    // const fileName = await uploadMyFile(files);
    const fileName = await uploadMyFile(files, undefined, 'images');
    res.json({ fileName });
  } catch (error) {
    res.status(400).json({ error });
  }
};

const updateCollectionImage = async (req = request, res = response) => {
  const { collection, id } = req.params;

  return res.json({ collection, id });
};

module.exports = {
  uploadFile,
  updateCollectionImage,
};
