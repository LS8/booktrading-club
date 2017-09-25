const { User } = require('../models');
const jwt = require('jsonwebtoken');
const config = require('../config');

function jwtSignUser (user) {
  const ONE_WEEK = 60 * 60 * 24 * 7;
  return jwt.sign(user, config.authentication.jwtSecret, {
    expiresIn: ONE_WEEK
  });
}

module.exports = {
  async register (req, res) {
    try {
      const user = await User.create(req.body);
      req.session.user = user.dataValues;
      res.json({ success: true, msg: 'Registration was successfull', status: 0 });
    } catch (err) {
      if (parseInt(err.original.code) === 23505 ) {
        if (err.fields.username) {
          res.json({ success: false, msg: 'Username is already registered', status: 1 });
        } else if (err.fields.email) {
          res.json({ success: false, msg: 'Email is already registered', status: 2 });
        }
      } else {
        res.json({ success: false, msg: 'Error', status: 3, err: err });
      }
    }
  },
  async login (req, res) {
    try {
      const { username , password } = req.body;
      const user = await User.findOne({
        where: {
          username: username
        }
      });
      if (!user) { return res.json({ success: false, msg: 'User not found', status: 1 }); }
      const isPasswordValid = await user.comparePassword(password);
      if (!isPasswordValid) {
        return res.json({ success: false, msg: 'Wrong password', status: 2 });
      }
      req.session.user = user.dataValues;
      res.json({
        success: true, 
        msg: 'Login was successfull',
        status: 0,
        user: {username: user.username, email: user.email, id: user.id },
        token: jwtSignUser(user.toJSON())
      });
    } catch (err) {
      res.json({ success: false, msg: 'Error while trying to log in', status: 1, err: err });
    }
  },
  async getSettings(req, res) {
    try {
      const user = await User.findById(req.user.id);
      res.json({ success: true, msg: 'Settings found', status: 0, settings: user.settings });
    } catch (e) {
      res.json({ success: false, msg: 'Error while trying to get settings', status: 1, err: err });
    }
  },
  async postSettings(req, res) {
    try {
      const user = await User.findById(req.user.id);
      const updatedUser = await user.updateAttributes({ settings: req.body.settings });
      res.json({ success: true, msg: 'Settings updated', status: 0 });
    } catch (e) {
      res.json({ success: false, msg: 'Error while trying to update settings', status: 1, err: err });
    }
  }
}
