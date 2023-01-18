const { Router } = require('express');
const Users = require('../models/users')
const app = Router();
const bcrypt = require('bcrypt');
const saltRounds = 10;

app.post('/register', async(req, res) => {
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
				console.log(data)
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
})


module.exports = app;