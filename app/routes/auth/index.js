const express = require('express');
const router = express.Router();
const login = require('../../models').login;
const register = require('../../models').register;
// router.route('/')
// .post((req, res, next)=>{
//     register(req.body)
//     .then(resData=>{
//         res.json(resData);
//     })
//     .catch(next)
// })


/* login */
router.route('/')
.post((req, res, next)=>{
    if(req.body.emailId && req.body.password){
       login(req.body)
       .then(data=>{
         res.send(data)
       })
       .catch(err=>{
        res.send(err)
       })
    }
})



// router.use((err, req, res, next)=>{
//     console.log(err)
//     if(err.message){
//         res.json({
//             isSuccess: false,
//             message: err.message.split(',').map(x => x.split(':')[x.split(':').length - 1])
//         })
//     }else{
//         res.send({
//             isSuccess: false,
//             message: err
//         })
//     }
    
// })
module.exports = router;