const { request, response } = require('express');
const bcryptjs = require('bcryptjs');

const User = require('../models/user.model');
const { generateJWT } = require('../helpers/generate-jwt');

const login = async (req = request, res = response) => {
  const { email, password } = req.body;

  try {
    // Verify if email exists
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ msg: 'Email or password are invalid - email' });
    }

    // Verify if user is active
    if (!user.status) {
      return res.json({ msg: 'Email or password are invalid - status false' });
    }

    // Verify if password is correct
    const isValidPassword = bcryptjs.compareSync(password, user.password);

    if (!isValidPassword) {
      return res.json({ msg: 'Email or password are invalid - password' });
    }

    // Generate JWT
    const token = await generateJWT(user.id);

    res.json({
      ok: true,
      user,
      access_token: token
    });

  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: 'Internal server error'
    });
  }
}

module.exports = {
  login
};