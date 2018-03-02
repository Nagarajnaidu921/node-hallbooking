'use strict';
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))
require('./app/routes')(app)
app.listen(3000, ()=>{console.log('running at 3000')})