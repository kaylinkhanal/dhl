const { Router } = require('express');
const Users = require('../models/users')
const app = Router();

app.get('/register', async(req, res) => {
try{
// const data = await Users.create(req.body)
// if(data){
//     res.json({

//        msg: "user register"
//     })
       
// }else{ res.json({
//     msg:'something went wrong'
// })
res.status(200).send("register")
// }
console.log(req.body)
}catch(err){
   
    console.log(err)
}

app.post('/sagar',async(req,res,next)=>{
try {
  
await Users.create(req.body)
    
} catch (error) {
    console.error(error)
}
})
})


module.exports = app;