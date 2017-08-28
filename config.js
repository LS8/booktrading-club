const secrets = require('./secrets');
module.exports = {
  port: process.env.PORT || 8080,
  dbAddress: process.env.DATABASE_URL || secrets.db || 'booktrading',
}

