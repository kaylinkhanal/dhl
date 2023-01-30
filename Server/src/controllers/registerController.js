const Users = require('../models/users')
const bcrypt = require('bcrypt');
const saltRounds = 10;

const registerUser = async(req, res) => {
    try{
		const dupUser = await Users.findOne({email: req.body.email})
		if (dupUser) {
			res.json({
				errmsg: 'User already exist. Please use unique	email id'
			})
		}else{
			const salt = bcrypt.genSaltSync(saltRounds);
			const hash = bcrypt.hashSync(req.body.password, salt);
			if (hash) {
				req.body.password = hash
				const data = await Users.create(req.body)
				if (data) {
					res.json({ msg: 'users registered' })
				} else {
					res.json({ msg: 'sth went wrong' })
				}
			}
		}
    }catch(err){
        console.log(err)
    }
}

exports.registerUser = registerUser