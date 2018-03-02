const mongoose = require('mongoose');
const seedUsers = require('./seed-user');

function seed(){
	seedUsers()
	.then(users=>{
		console.log(users)
		mongoose.connection.close();
	})
	.catch(err=>{
		console.log(err);
		process.exit(1);
	})
}

module.exports = seed