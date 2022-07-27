const express = require("express");
const fs = require('fs');
const cors = require('cors');
const PORT = 4002;
const app = express();
const bodyParser = require('body-parser');
const https = require('https');
const http = require('http');
var multer = require('multer');
var upload = multer();
const path = require('path');
var json2xls = require('json2xls');
// /path/to
var https_options = {
    pfx: fs.readFileSync("ssl/certificate.pfx"),
    passphase: '123'
    
//  ciphers: "DEFAULT:!SSLv2:!RC4:!EXPORT:!LOW:!MEDIUM:!SHA1"
    
  };

  var sslSrv = null;




app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type,Accept, x-client-key, x-client-token, x-client-secret, Authorization");
   
    next();
});

app.use(cors());
app.use(express.static('assets'));
app.use('/assets', express.static('assets'));
app.use(json2xls.middleware);

app.get("/", (req, res) => {
    res.json({ message: "Conference Application Node Api running...." });

    res.end();
});

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(express.static(__dirname + '/assets'));


require("./routes/login.routes.js")(app);
require("./routes/conferenceinsert.routes.js")(app);
require("./routes/managerreport.routes.js")(app);

const server = http.createServer(app);
sslSrv = server.listen(PORT, function() {
    console.log('Node app is running on port 4002');
});