const { Router } = require('express');
const { check } = require('express-validator');

const { login } = require('../controllers/auth.controller');
const { validateFields } = require('../middlewares/validate-fields');

const router = Router();

router.post('/login', [
  check('email', 'Email is invalid').isEmail(),
  check('password', 'Password must be at least 6 characters').isLength({ min: 6 }),
  validateFields
], login);


module.exports = router;