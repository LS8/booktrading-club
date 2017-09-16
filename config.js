const secrets = require('./secrets');
module.exports = {
  port: process.env.PORT || 8080,
  cookieSecret: secrets.cookie,
  db: {
    database: process.env.DATABASE_URL || 'booktrading' || secrets.db,
    user: 'chinchi',
    password: '123456',
    options: {
      dialect: 'postgres',
      host: 'localhost'
    }
  }
}

