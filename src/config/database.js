const mongoose = require('mongoose');

const connection = () => {
  const url =
    process.env.NODE_ENV === 'test'
      ? process.env.MONGO_URL_TEST
      : process.env.MONGO_URL;

  mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });
};

module.exports = connection;
