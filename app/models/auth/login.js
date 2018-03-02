const User = require('./user');
const PasswordServ = require('../../lib/password');
const TokenServ = require('../../lib/token');

function login(data) {
   
    const resData = {};
   return User.findOne({ emailId: data.emailId }, { _id: false, __v: false })
    .then(user=>{
    	if(user){
    		resData.id = user.id;
    		resData.userName = user.userName;
    		resData.emailId = user.emailId;
    		return PasswordServ.match(data.password, user.password);
    	}else{
    		return Promise.reject({
    			isSuccess: false,
    			message: 'Account not found'
    		})
    	}
    })
    .then(isSame=>{
    	if(isSame){
    		resData.isSuccess = true;
    		 return TokenServ.generateToken(resData);
    	}else{
    		return Promise.reject({
    			isSuccess: false,
    			message: 'invalid emaiId or password'
    		})
    	}
    })
    .then(token=>{
    	resData.token = token;
    	return Promise.resolve(resData)
    })
}


module.exports = login;