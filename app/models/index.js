const db = require('./db');
const register = require('./auth/register');
const login = require('./auth/login');
const event = require('./event/schema');
module.exports = {
	db,
	register,
	login,
	event

}