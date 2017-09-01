const express = require('express');
const path = require('path');
const bodyparser = require('body-parser');
const session = require('express-session');
const app = express();
const config = require('./config');
const routes = require('./routes/index');

// Common Middleware uncomment and npm install when required

const cors = require('cors');
app.use(cors());

app.use(bodyparser.json());

// initialize express-session
app.use(session({
  name: 'user',
  secret: config.cookieSecret,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 6000000
  }
}));

// if cookie still present when user is not set then delete cookie (log out)
app.use((req, res, next) => {
  if (req.session.cookie && !req.session.user) {
    res.clearCookie('user');
  }
  next();
});

// Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));
app.get('/', function (req, res) { // let frontend handle client side routing
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Use Routes
app.use('/api', routes);

app.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
});
