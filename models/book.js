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

const Book = sequelize.define('book', {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  ownerId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  author: {
    type: Sequelize.STRING,
  },
  previewLink: {
    type: Sequelize.STRING,
  },
  imageLink: {
    type: Sequelize.STRING
  }
},
  {
    updatedAt: false
  },
);

// User.prototype.validPassword = (providedPassword, user) => {
//   return providedPassword== user.password;
// };

sequelize.sync()
  .then( () => {
    console.log('Books table has been successfully created, if one doesnt exist');;
  })
  .catch( (error) => {
    console.log('This error occured ', error);
  });

module.exports = Book;
