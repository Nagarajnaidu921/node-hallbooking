const auth = require('./auth');
const event = require('./events/event.js');
const getevents = require('./events/getevents.js')

const path = require('path');
const Token = require(path.resolve('./app/lib/token'));


function sendErrorResposns(error, res) {
    const { message } = error;
    return res.status(403).json({
        message,
        success: false
    })
}

function isAuthorized(req, res, next) {
    // console.log(req.headers)
    const token = req.headers.Authorization || req.headers.authorization || req.headers['x-access-token'];
    	// console.log(token)
    
    if (token) {
        Token.verifyToken(token)
            .then(decodedToken => {
                return next();
            })
            .catch(error => sendErrorResposns(error, res))
    } else {
    	const error = new Error('Unauthorized Access');
    	return sendErrorResposns(error, res);
    }
}

module.exports = app =>{
	// app.use('/api/auth/register', auth)
	app.use('/api/auth/login', auth)
	app.use('/api/event/*', isAuthorized)
	app.use('/api/event', event)
	// app.use('/api/getevents/*', isAuthorized)
	app.use('/api/getevents', getevents)

}