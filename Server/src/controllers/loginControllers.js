const Users = require('../models/users')
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

const Login = async(req, res) => {
    try{
    const data = await Users.findOne({email: req.body.email})
    var token = jwt.sign({ email: req.body.email }, process.env.SECRET_KEY);
    if(data){
        const dbPassword = data.password
        console.log(data.password)
        const isValidPassword = bcrypt.compareSync(req.body.password, dbPassword)
        const {password, __v, ...refactoredData} = data.toObject()
        if(isValidPassword){
            
            res.json({
                msg: 'login success',
                userDetails: refactoredData,
                token: token
            })
        }else{
            res.json({
                msg: 'password did not match'
            })
        }
    }else{
        res.json({
            msg: 'invalid credentials'
        })
    }
 

    }catch(err){
        console.log(err)
    }
}


exports.Login = Login;
