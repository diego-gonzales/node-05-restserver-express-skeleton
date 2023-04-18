const { Router } = require('express');
const {
  uploadFile,
  updateCollectionImage,
} = require('../controllers/uploads.controller');
const { param } = require('express-validator');
const { validCollections } = require('../helpers');
const { validateFields } = require('../middlewares');
const { VALID_COLLECTIONS_TO_UPLOAD_FILE } = require('../consts');

const router = Router();

router.post('/', uploadFile);

router.put(
  '/:collection/:id',
  [
    param('id', 'The ID is not valid').isMongoId(),
    param('collection', 'The collection is not valid').isIn(
      VALID_COLLECTIONS_TO_UPLOAD_FILE
    ),
    validateFields,
  ],
  updateCollectionImage
);

module.exports = router;
