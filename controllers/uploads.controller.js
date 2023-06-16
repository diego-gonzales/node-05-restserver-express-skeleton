const { request, response } = require('express');
const { uploadMyFile } = require('../helpers/upload-file');
const { User, Product } = require('../models');
const { VALID_COLLECTIONS } = require('../consts');

const uploadFile = async (req = request, res = response) => {
  try {
    const fileName = await uploadMyFile(req.files, undefined, 'images');
    res.json({ fileName });
  } catch (error) {
    res.status(400).json({ error });
  }
};

const updateCollectionImage = async (req = request, res = response) => {
  const { collection, id } = req.params;

  let model;

  switch (collection) {
    case VALID_COLLECTIONS.USERS:
      model = await User.findById(id);

      if (!model) {
        return res.status(400).json({
          ok: false,
          msg: `There is no user with the id ${id}`,
        });
      }
      break;
    case VALID_COLLECTIONS.PRODUCTS:
      model = await Product.findById(id);

      if (!model) {
        return res.status(400).json({
          ok: false,
          msg: `There is no product with the id ${id}`,
        });
      }
      break;
    default:
      return res.status(500).json({ ok: false, msg: 'Not implemented yet' });
  }

  // Clean previous images
  // if (model.imageURL) {
  //   const path = `./uploads/${collection}/${model.imageURL}`;
  //   if (fs.existsSync(path)) {
  //     fs.unlinkSync(path);
  //   }
  // }

  const fileName = await uploadMyFile(req.files, undefined, collection);
  model.imageURL = fileName;
  await model.save();

  return res.json(model);
};

module.exports = {
  uploadFile,
  updateCollectionImage,
};
