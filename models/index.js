const fs = require('fs');
const path = require('path');
const config = require('../config');
const Sequelize = require('sequelize');
const db = {};

let sequelize;

if (!config.db.URI) {
  sequelize = new Sequelize(
    config.db.database,
    config.db.user,
    config.db.password,
    config.db.options
  );
} else {
  sequelize = new Sequelize( config.db.URI, {
    dialect: 'postgres',
    protocol: 'postgres',
    dialectOptions: { ssl: true }
  });
}

fs
  .readdirSync(__dirname)
  .filter((file) => 
    file !== 'index.js'
  )
  .forEach((file) => {
    const model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
