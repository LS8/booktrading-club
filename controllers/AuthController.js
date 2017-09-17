const { User } = require('../models');

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
  }
}
