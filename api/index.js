const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser'); 
const cors = require('cors');

const app = express()

app.use(bodyParser.urlencoded({ extended: false })) // parse application/x-www-form-urlencoded
app.use(bodyParser.json()) // parse application/json

// Settings
app.set('port', process.env.DB_PORT || 4000);

// Connection DB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true } )

// Middlewares
app.use(cors());

// Routes
app.use('/api', require('./Routes/routes'))

/* app.listen(port, () => {
    console.log('Server listening on port ' + port);
}); */

module.exports = app