var jwt = require('jsonwebtoken');
const isAuthorized = async(req, res, next)=>{
    const token = req.headers.authorization.split(' ')[1]

    jwt.verify(token, process.env.SECRET_KEY, function(err, decoded) {
        console.log(decoded) // bar
        // console.log(err)

        if(err) res.sendStatus(403)
        if(decoded.email){
            next()
        }
    });
}

module.exports = isAuthorized;