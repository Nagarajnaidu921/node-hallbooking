const User = require('./user');

function register(data){
    return User.findOne({emailId: data.emailId})
    .then(user=>{
        if(user){
            
            return {
                isSuccess: false,
                message: 'This email is already linked with another account'
            }
        } else {
            return User.createUser(data)
        }
    })
}
module.exports = register;