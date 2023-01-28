const { Router } = require('express');
const Category = require('../models/productCategory')
const app = Router();

app.post('/category', async(req,res)=>{
    try{
        const categoryData = await Category.create(req.body)
        if(categoryData){
            res.json({
                categoryList: categoryData,
                msg: 'Added new category'
            })
        }else{
            msg: 'something went wrong'
        }
        
    }catch(err){
        console.log(err)
    }
})

app.get('/category', async(req,res)=>{
    try{
        const categoryData = await Category.find()
        res.json({
            categoryList: categoryData,
        })
        
    }catch(err){
        console.log(err)
    }
})

module.exports = app;