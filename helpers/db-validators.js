const Role = require('../models/role.model');
const User = require('../models/user.model');

const isValidRole = async (value = '') => {
  const roleExists = await Role.findOne({ role: value });
  if (!roleExists) {
    throw new Error(`Role ${value} does not exists`);
  }
}

const emailExists = async (value = '') => {
  const emailExists = await User.findOne({ email: value });
  if (emailExists) {
    throw new Error(`Email ${value} already registered`);
  }
}

const userExistsByID = async (value = '') => {
  const userExists = await User.findById(value);
  if (!userExists) {
    throw new Error(`User ${value} does not exists`);
  }
}

module.exports = {
  isValidRole,
  emailExists,
  userExistsByID
};