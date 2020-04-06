const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

require('dotenv').config();

const User = require('../models/User');

module.exports = {
  async login(request, response) {
    User.findOne(
      {
        email: request.body.email,
      },
      async (error, user) => {
        if (error) throw error;

        if (!(await bcrypt.compare(request.body.password, user.password))) {
          response.status(400).json({
            success: false,
            message: 'Authentication failed. Please provide a valid user.',
          });
        } else if (user) {
          let token = await jwt.sign({ user }, process.env.SECRET, {
            expiresIn: '24h',
          });

          response.json({
            success: true,
            _id: user._id,
            email: user.email,
            token: token,
          });
        } else {
          response.status(401).json({
            success: false,
            message: 'Email or password incorrect(s).',
          });
        }
      }
    );
  },
};
