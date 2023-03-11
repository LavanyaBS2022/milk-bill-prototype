/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

const sPort = "2020";

const express = require('express');
const path = require('path');


const app = express();


app.use('/ccc/ui/v2', express.static(__dirname));

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

const server = app.listen(sPort, () => {
  const address = server.address();
  const url = `http://${address.host || 'localhost'}:${sPort}`;
  console.info(`Listening at ${url}`);
});
