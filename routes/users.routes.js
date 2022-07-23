const { Router } = require('express');
const { getUsers, createUser, updateUser, deleteUser, getUser } = require('../controllers/users.controller');

const router = Router();

router.get('/', getUsers);
router.get('/:id', getUser);
router.post('/', createUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

module.exports = router;