require('./server/config/database');
const express = require('express');
const app = express();
const path = require('path');
const bp = require('body-parser');
const router = require('./server/routes');
const jwt = require('jsonwebtoken');
app.use(express.urlencoded({extended: true}));
app.use(bp.urlencoded({ extended: false }))
app.use(bp.json())
app.use(express.static( path.join(__dirname, './dist/funday')));
app.set('secretKey', 'bgy9u7w6nwv5bfnk');
app.use(router);

app.listen(8000, () => console.log('listening on port 8000'));
