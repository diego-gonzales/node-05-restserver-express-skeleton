const { response, request } = require('express');
const bcryptjs = require('bcryptjs');

const User = require('../models/user.model');

const getUsers = (req = request, res = response) => {
  const { page = '1', page_size = '10' } = req.query;

  res.json({
    msg: 'get users',
    page,
    page_size
  });
};

const getUser = (req = request, res = response) => {
  const userID = req.params.id;

  res.json({
    msg: 'get user',
    data: {
      userID
    }
  });
};

const createUser = async (req = request, res = response) => {
  const { name, email, password, role } = req.body;
  const user = new User({ name, email, password, role });

  // Verify if email is already registered
  const emailExists = await User.findOne({ email });
  if (emailExists) {
    return res.status(400).json({
      msg: 'Email already registered'
    });
  }

  // Encrypt password
  const salt = bcryptjs.genSaltSync();
  user.password = bcryptjs.hashSync(password, salt);

  await user.save();

  res.status(201).json({
    user
  });
};

const updateUser = (req = request, res = response) => {
  const userID = req.params.id;

  res.json({
    msg: 'put user',
    data: {
      userID
    }
  });
};

const deleteUser = (req = request, res = response) => {
  const userID = req.params.id;

  res.json({
    msg: 'delete user',
    data: {
      userID
    }
  });
}


module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser
}