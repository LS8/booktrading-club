const Sequelize = require('sequelize');

const sequelize = new Sequelize('booktrading', 'chinchi', '123456',
  {
    host: 'localhost',
    dialect: 'postgres',
    pool: {
      max: 5,
      min: 0,
      idle: 10000
    }
});

const User = sequelize.define('user', {
  username: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  email: {
    type: Sequelize.TEXT,
    allowNull: false,
    unique: true
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  }
},
  {
    updatedAt: false
  }
);

sequelize.sync()
  .then( () => {
    console.log('Users table has been successfully created, if one doesnt exist');;
  })
  .catch( (error) => {
    console.log('This error occured ', error);
  });

module.exports = User;
