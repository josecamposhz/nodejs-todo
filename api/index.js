const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser');
require("dotenv").config();

const cors = require('cors');

const app = express()

app.use(bodyParser.urlencoded({ extended: false })) // parse application/x-www-form-urlencoded
app.use(bodyParser.json()) // parse application/json

// Settings
app.set('port', process.env.DB_PORT || 4000);

// Connection to mongoDB
mongoose.connect(process.env.MONGODB_URI,
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  }
)

// Middlewares
app.use(cors());

// Routes
app.use('/api', require('./Routes/routes'));

app.listen(app.get('port'), function () {
  console.log(`App running at: http://localhost:${app.get('port')}`);
});

module.exports = app