// Database configuration
const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
////////////////////////////////////////////////////////////////////////
const express = require('express');
const cors = require('cors')
const bodyParser = require('body-parser');
const path = require('path');
// Create the Express Application [2]
////////////////////////////////////////////////////////////////////////
const app = express();
// Configure the server [3]
////////////////////////////////////////////////////////////////////////
// Parse requests of content-type - "application/x-www-form-urlencoded"
app.use(bodyParser.urlencoded({ extended: true }))
// Parse requests of content-type - "application/json"
app.use(bodyParser.json())
// Activate the CORS access on all routes
app.use(cors())
// Listening server port
var port = process.env.PORT || 3000;
require('./app/routes/package.routes.js')(app);
require('./app/routes/registry.routes.js')(app);
require('./app/routes/app.routes.js')(app, path);
// Connect to the database
mongoose.connect(dbConfig.url)
.then(() => {
 console.log("Connect to database: success!");
}).catch(err => {
 console.log('Connect to database: failure!');
 process.exit();
});
////////////////////////////////////////////////////////////////////////
app.listen(port, () => {
 console.log("Server is listening on port " + port);
});
