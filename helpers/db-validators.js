const { Role, User, Category } = require('../models');

const isValidRole = async (value = '') => {
  const roleExists = await Role.findOne({ role: value });
  if (!roleExists) {
    throw new Error(`Role '${value}' does not exists.`);
  }
};

const emailExists = async (value = '') => {
  const emailExists = await User.findOne({ email: value });
  if (emailExists) {
    throw new Error(`Email '${value}' has already been registered.`);
  }
};

const userExistsByID = async (value = '') => {
  const userExists = await User.findById(value);
  if (!userExists) {
    throw new Error(`User '${value}' does not exists`);
  }
};

const categoryExistsByName = async (value = '') => {
  // Aquí uso el 'toUpperCase()' ya que al guardar una categoría la guardo en mayúsculas
  const categoryExists = await Category.findOne({ name: value.toUpperCase() });
  if (categoryExists) {
    throw new Error(`Category '${value}' has already been registered.`)
  }
};

const categoryExistsByID = async(value = '') => {
  const categoryExists = await Category.findById(value);
  if (!categoryExists) {
    throw new Error(`Category '${value}' does not exists.`);
  }
};

module.exports = {
  isValidRole,
  emailExists,
  userExistsByID,
  categoryExistsByName,
  categoryExistsByID
};