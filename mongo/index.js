const mongoose = require('mongoose');

class MongoDB {
  constructor() {
    this.connection = mongoose.connect(
      process.env.MONGO_URI, 
      { useNewUrlParser: true }
    ); 
  }

  test(s) {
    const Test = this.connection.model('Test', new mongoose.Schema({name: String}));
    return Test.create({name: s});
  }
}

module.exports = new MongoDB();