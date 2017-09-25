module.exports = {
  port: process.env.PORT || 8080,
  cookieSecret: '123',
  db: {
    URI: process.env.DATABASE_URL,
    database: process.env.DB_NAME || 'booktrading' || secrets.db,
    user: process.env.DB_USER || 'chinchi',
    password: process.env.DB_PASS || '123456',
    options: {
      dialect: process.env.DIALECT || 'postgres',
      host: process.env.HOST || 'localhost'
    }
  },
  authentication: {
    jwtSecret: process.env.JWT_SECRET || require('./secrets').jwtSecret
  }
}

