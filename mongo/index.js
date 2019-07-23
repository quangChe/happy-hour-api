const mongoose = require('mongoose');

class Database {
  constructor() {
    mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true });
  }

  test(s) {
    const Test = mongoose.model('Test', new mongoose.Schema({name: String}));

    return Test.create({name: s});
  }
}

module.exports = new Database();