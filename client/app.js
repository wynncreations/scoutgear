var express = require('express');
var path = require('path');
const dotenv = require("dotenv");
var serveStatic = require('serve-static');
app = express();
app.use(serveStatic(__dirname + "/dist"));

var hostname = '127.0.0.1';

dotenv.config();
var port = process.env.PORT || 5000;

app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});