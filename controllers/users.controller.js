const { response, request } = require('express');

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

const createUser = (req = request, res = response) => {
  const { name, age } = req.body;

  res.status(201).json({
    msg: 'post user',
    data: {
      name,
      age
    }
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