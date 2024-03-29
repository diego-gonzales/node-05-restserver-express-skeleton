const { Router } = require('express');
const { check } = require('express-validator');

const { login, googleSignIn } = require('../controllers/auth.controller');
const { validateFields } = require('../middlewares');

const router = Router();

router.post(
  '/login',
  [
    check('email', 'Email is invalid').isEmail(),
    check('password', 'Password must be at least 6 characters').isLength({
      min: 6,
    }),
    validateFields,
  ],
  login
);

router.post(
  '/google',
  [
    check('google_token', 'Google token is necessary').not().isEmpty(),
    validateFields,
  ],
  googleSignIn
);

module.exports = router;
