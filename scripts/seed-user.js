
const path = require('path');

const User = require(path.resolve('./app/models/auth/user'))
const users = [{
        userName: 'CSE',
        emailId: 'nagarajnaidu921@hotmail.com',
        password: 'nagaraj'
    },
    {
        userName: 'ECE',
        emailId: 'nagarajnaidu921@gmail.com',
        password: 'nagaraj'
    }
]

function seedUser() {

    function createUser({ emailId, userName, password }) {
    	console.log(emailId, password, userName)
        User.findOne({ emailId: emailId }).exec()
            .then(user => {
                console.log(user)
                User.createUser({ emailId, userName, password })
            })

    }


    return Promise.all(users.map(createUser);

}
module.exports = seedUser