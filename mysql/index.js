const mysql = require('mysql');

class MySql {
  constructor() {
    this.db = mysql.createConnection({
      host     : 'localhost',
      user     : 'root',
      password : process.env.MYSQL_PW,
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
          await this.initDatabase();
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

  initDatabase() {
    return new Promise((resolve, reject) => {
      const createQuery = `CREATE DATABASE IF NOT EXISTS happy_hour;`;

      this.db.query(createQuery, (err, res) => {
        if (err) {
          reject(err);
        } else {
          const useDbQuery = `USE happy_hour;`;
          this.db.query(useDbQuery, (err, res) => {
            if (err) {
              reject(err);
            } else {
              console.log("Connected to happy_hour databse.");
              resolve(res);
            }
          })
          resolve(res);
        }
      });
    })
  }

  initUsers() {
    return new Promise((resolve, reject) => {
      this.db.query(`SHOW TABLES LIKE 'users'`, (err, res) => {
        if (err) reject(err);
        if (!res) {
          console.log('Inserting new users...');
          this.db.query(`CREATE TABLE users (id INT AUTO_INCREMENT, firstName VARCHAR(15) NOT NULL, age INT NOT NULL, PRIMARY KEY (id))`, (err) => {
            if (err) reject(err);
            const mockData = `
              ("Abraham", "36"),
              ("Bill", "27"),
              ("Samantha", "28"),
              ("John", "34"),
              ("Rowland", "32")
            `;
            this.db.query(`INSERT INTO users(firstName, age) VALUES ${mockData}`, (err, res) => {
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
          this.db.query(`CREATE TABLE favorites (id INT AUTO_INCREMENT, name VARCHAR(15) NOT NULL, description VARCHAR(255), PRIMARY KEY (id))`, (err) => {
            if (err) reject(err);            
            const mockData = `
              ("Mike's Brewery", "A local favorite microbrewery with some of the best IPA's"),
              ("Leche de Agave", "Newest dive bar featuring exotic latin cocktails made"),
              ("Totem Spike", "Wear your Hawaiian shirts and experience an island getaway with 100+ tropical cocktails"),
              ("Board & Brew", "Delicious sandwiches and a long list of beers"),
              ("AJ Sports Bar", "Wings, beer and 80+ big screen TV's featuring 10+ different sports networks")
            `;
      
            this.db.query(`INSERT INTO favorites(name, description) VALUES ${mockData}`, (err, res) => {
              if (err) reject(err);
              resolve(res);
            });
          });
        }
      }) 
    })
  }
}

module.exports = new MySql();