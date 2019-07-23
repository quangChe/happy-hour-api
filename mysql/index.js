const mysql = require('mysql');

class Database {
  constructor() {
    this.db = mysql.createConnection({
      host     : 'localhost',
      user     : 'root',
      password : process.env.MYSQL_PW,
      database : 'happy_hour',
    });
  }

  start() {
    this.db.connect( async (err) => {
      if (err) {
        console.error(err);
        throw err;
      }
      else {
        try {
          await this.initUsers();
          await this.initFavorites();
          console.log('Successfully connected to MySQL!');
          return;
        } catch (err) {
          throw err;
        }
      }
    });
  }

  initUsers() {
    return new Promise((resolve, reject) => {
      this.db.query(`SHOW TABLES LIKE 'users'`, (err, res) => {
        if (err) reject(err);
        if (!res.length) {
          console.log('Inserting new users...');
          this.db.query(`CREATE TABLE users (id VARCHAR(20) NOT NULL, firstName VARCHAR(15) NOT NULL, age INT NOT NULL)`, (err) => {
            if (err) reject(err);
            const mockData = `
              ("1", "Abraham", "36"),
              ("2", "Bill", "27"),
              ("3", "Samantha", "28"),
              ("4", "John", "34"),
              ("5", "Rowland", "32")
            `;
            this.db.query(`INSERT INTO users(id, firstName, age) VALUES ${mockData}`, (err, res) => {
              if (err) reject(err);
              resolve(res);
            });
          });
        }
      });
    })
  }

  initFavorites() {
    return new Promise((resolve, reject) => {
      this.db.query(`SHOW TABLES LIKE 'favorites'`, (err, res) => {
        if (err) reject(err);
        if (!res.length) {
          console.log('Inserting new favorites...')
          this.db.query(`CREATE TABLE favorites (id VARCHAR(20) NOT NULL, name VARCHAR(15) NOT NULL, description VARCHAR(255))`, (err) => {
            if (err) reject(err);            
            const mockData = `
              ("1", "Mike's Brewery", "A local favorite microbrewery with some of the best IPA's"),
              ("2", "Leche de Agave", "Newest dive bar featuring exotic latin cocktails made"),
              ("3", "Totem Spike", "Wear your Hawaiian shirts and experience an island getaway with 100+ tropical cocktails"),
              ("4", "Board & Brew", "Delicious sandwiches and a long list of beers"),
              ("5", "AJ Sports Bar", "Wings, beer and 80+ big screen TV's featuring 10+ different sports networks")
            `;
      
            this.db.query(`INSERT INTO favorites(id, name, description) VALUES ${mockData}`, (err, res) => {
              if (err) reject(err);
              resolve(res);
            });
          });
        }
      }) 
    })
  }
}

module.exports = new Database();