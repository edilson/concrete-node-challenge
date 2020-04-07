const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

require('dotenv').config();

const User = require('../models/User');

module.exports = {
  login(request, response) {
    User.findOne(
      {
        email: request.body.email,
      },
      async (error, user) => {
        try {
          if (error) throw error;

          if (
            user.email === request.body.email &&
            (await bcrypt.compare(request.body.password, user.password))
          ) {
            let token = await jwt.sign({ user }, process.env.SECRET, {
              expiresIn: '24h',
            });

            return response.json({
              success: true,
              _id: user._id,
              email: user.email,
              token: token,
            });
          }
        } catch (error) {
          return response.status(400).json({
            success: false,
            message: 'Authentication failed. Please provide a valid user.',
          });
        }
      }
    ).select('+password');
  },
};
