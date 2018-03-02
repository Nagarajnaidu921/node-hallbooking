'use strict';
const bcrypt = require('bcrypt');
const saltRounds = 10;

function hash(passWord) {
	return bcrypt.hash(passWord, saltRounds); // This will return promise..
}

function match(plainPassword, hashedPassword) {
	
	if (plainPassword && hashedPassword) {
		return bcrypt.compare(plainPassword, hashedPassword); // This will return promise..
	}
		return Promise.resolve(false)
}


module.exports = {
	hash: hash,
	match: match
};
