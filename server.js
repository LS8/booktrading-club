const express = require('express');
const app = express();
const config = require('./config');
const path = require('path');
const routes = require('./routes');
const { Client } = require('pg');

const client = new Client({
  connectionString: config.dbAddress,
});
client.connect();


// Common Middleware uncomment and npm install when required

// const cors = require('cors');
// const bodyparser = require('body-parser');

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
app.use('/api', routes);

app.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
});
