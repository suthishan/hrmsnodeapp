const crypto = require("crypto");
const fs = require("fs");
const express = require("express");
const app = express();
const PORT = 4002;
const http = require('http');

var mcrypt = require('mcrypt');
var bfEcb = new mcrypt.MCrypt('aes-256-cbc','ecb');
var iv = bfEcb.generateIv();

bfEcb.open('GoD786', iv);

var cipherText = bfEcb.encrypt('sometext');

console.log(Buffer.concat([iv, cipherText]).toString('base64'));

// var mcrypt = require('mcrypt');
var bfEcb = new mcrypt.MCrypt('aes-256-cbc','ecb');

var ivAndCiphertext = new Buffer('AyvfjTyg24Y9fVCdjzRPEw==', 'base64');

var ivSize = bfEcb.getIvSize();
var iv = new Buffer(ivSize);
var cipherText = new Buffer(ivAndCiphertext.length - ivSize);

ivAndCiphertext.copy(iv, 0, 0, ivSize);
ivAndCiphertext.copy(cipherText, 0, ivSize);

bfEcb.open('GoD786', iv);

console.log(bfEcb.decrypt(cipherText).toString());

const server = http.createServer(app);
sslSrv = server.listen(PORT, function() {
    console.log('Node app is running on port 4002');
});