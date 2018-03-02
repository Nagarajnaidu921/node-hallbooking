'use strict';
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const uri = 'mongodb://localhost/hallbooking';
mongoose.connect(uri)
.then(()=>{
	console.log('db connection establised');
})
.catch(err =>{
	console.log(err);
});

module.exports = mongoose; 