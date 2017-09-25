const express = require('express');
const history = require('connect-history-api-fallback');
const path = require('path');
const bodyparser = require('body-parser');
const app = express();
const config = require('./config');
const userRoutes = require('./routes/user');
const bookRoutes = require('./routes/book');
const { sequelize } = require('./models');

const cors = require('cors');
app.use(cors());

app.use(bodyparser.json());

if (process.env.PROD_HEROKU) { app.use(history()); }

require('./passport');

// Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));
app.get('/', function (req, res) { // let frontend handle client side routing
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Use Routes
app.use('/api', userRoutes);
app.use('/api', bookRoutes);

sequelize.sync()
  .then(() => {
    app.listen(config.port);
    console.log(`Server running on port ${config.port}`);
  });
