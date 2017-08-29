const express = require('express');
const path = require('path');
const bodyparser = require('body-parser');
const app = express();
const config = require('./config');
const routes = require('./routes/index');

// Common Middleware uncomment and npm install when required

// const cors = require('cors');

app.use(bodyparser.json());
// const passport = require('passport');
// app.use(passport.initialize());
// config.passportStrategy(passport);

// app.use(cors());

// Set Static Folder
// app.use(express.static(path.join(__dirname, 'public')));
app.get('/', function (req, res) { // let frontend handle client side routing
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Use Routes
app.use('/api', routes);

app.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
});
