var express = require('express');
var path = require('path');
const dotenv = require("dotenv");
var serveStatic = require('serve-static');
const history = require("connect-history-api-fallback");


var app = express();
app.use(history());
app.use(serveStatic(__dirname + "/dist"));


var hostname = 'scoutsgeared.com';

//var hostname = 'localhost';

dotenv.config();
var port = process.env.PORT || 5000;


app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});