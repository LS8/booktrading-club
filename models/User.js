const Promise = require('bluebird');
const bcrypt = Promise.promisifyAll(require('bcrypt-nodejs'));

function hashPassword (user, options) {
  const SALT_FACTOR = 8;
  if (!user.changed('password')) {
    return;
  }

  return bcrypt
    .genSaltAsync(SALT_FACTOR)
    .then(salt => bcrypt.hashAsync(user.password, salt, null))
    .then(hash => {
      user.setDataValue('password', hash);
    });
}

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    email: {
      type: DataTypes.TEXT,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
  },
    {
      updatedAt: false,
      hooks: {
        beforeCreate: hashPassword,
        beforeUpdate: hashPassword,
        beforeSave: hashPassword
      }
    },
  );
User.prototype.comparePassword = function (candidatePassword) {
  return bcrypt.compareAsync(candidatePassword, this.password)
};

return User
}

// sequelize.sync()
//   .then( () => {
//     console.log('Users table has been successfully created, if one doesnt exist');;
//   })
//   .catch( (error) => {
//     console.log('This error occured ', error);
//   });

// module.exports = User;
