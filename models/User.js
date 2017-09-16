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
      updatedAt: false
    },
  );
User.prototype.validPassword = (providedPassword, user) => {
  return providedPassword== user.password;
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
