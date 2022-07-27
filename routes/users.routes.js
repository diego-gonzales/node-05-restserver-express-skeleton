const { Router } = require('express');
const { check } = require('express-validator');
const { getUsers, createUser, updateUser, deleteUser, getUser } = require('../controllers/users.controller');
const { isValidRole, emailExists } = require('../helpers/db-validators');
const { validateFields } = require('../middlewares/validate-fields');

const router = Router();

router.get('/', getUsers);
router.get('/:id', getUser);
router.post('/', [
  check('name', 'Name is required').not().isEmpty(),
  check('email', 'Email invalid').isEmail(),
  check('email').custom(emailExists),
  check('password', 'Password must be at least 6 characters').isLength({ min: 6 }),
  // This is not necessary because we are using the Role model to validate the role
  // check('role', 'Role must be user or admin').isIn(['user', 'admin']),
  check('role').custom(isValidRole),
  validateFields
], createUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

module.exports = router;