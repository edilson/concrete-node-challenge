const User = require('../models/User');

module.exports = {
  async create(request, response) {
    try {
      const { name, email, password, telephones } = request.body;

      const user = new User({
        name,
        email,
        password,
        telephones,
      });

      const _id = user._id;
      const created_at = user.created_at;
      const modified_at = user.modified_at;

      await user.save();

      return response.status(201).json({ _id, created_at, modified_at });
    } catch (error) {
      return response
        .status(400)
        .json({ error: 'Unable to create user, invalid data.' });
    }
  },

  findUser(request, response) {
    User.findById(request.headers['x-access-token'], async (error, user) => {
      try {
        if (error) {
          throw new Error();
        } else {
          return response.json({ user });
        }
      } catch (error) {
        return response.status(404).json({ error: 'User not found.' });
      }
    });
  },
};
