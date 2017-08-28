const express = require('express');
const app = express();
const config = require('./config');
const path = require('path');
// const routes = require('./routes'); Routes

// Common Middleware uncomment and npm install when required

// const cors = require('cors');
// const bodyparser = require('body-parser');


// const mongoose = require('mongoose');
// mongoose.connect(config.mongoAddress, { useMongoClient: true });
// mongoose.connection.on('connected', () => { console.log(`Connected to database on ${config.mongoAddress}`); });
// mongoose.connection.on('error', (err) => { console.log(`Database error: ${err} while trying to connect on ${config.mongoAddress}`);});

// const passport = require('passport');
// app.use(passport.initialize());
// config.passportStrategy(passport);

// app.use(bodyparser.json());
// app.use(cors());

// Set Static Folder
// app.use(express.static(path.join(__dirname, 'public')));
app.get('/', function (req, res) { // let frontend handle client side routing
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Use Routes
// app.use('/api', routes);

app.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
});
