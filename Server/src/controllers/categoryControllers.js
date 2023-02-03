const Category = require('../models/Categories')

const postCategory =  async(req,res)=>{
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
}


const getCategory =  async(req,res)=>{
    try{
        const categoryData = await Category.find()
        res.json({
            categoryList: categoryData,
        })
        
    }catch(err){
        console.log(err)
    }
}

const deleteCategory =  async(req,res)=>{
    try{
        const categoryData = await Category.findByIdAndRemove(req.body.id)
        if (categoryData) {
            res.json({
                msg: "deleted successfully"
            })
        }
        
    }catch(err){
        console.log(err)
    }
}

exports.postCategory = postCategory;
exports.getCategory = getCategory;
exports.deleteCategory = deleteCategory;
