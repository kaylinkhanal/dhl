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
            res.json({
                msg: 'something went wrong'
            })
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
const updateCategory = async(req,res)=>{
    try {
            const data = await Category.findByIdAndUpdate(req.body._id, req.body)
            if (data) {
                res.json({
                    msg: "updated successfully"
                })
            } else {
                res.json({
                    msg: "something went wrong"
                })
            } 
       } catch (error) {
        console.error(error);
    }
}

const deleteCategory = async(req,res)=>{
    try{
        const data = await Category.findByIdAndDelete(req.body.id)
        if (data) {
            res.json({
                msg: "category deleted successfully"
            })
        } else {
            res.json({
                msg: "something went wrong"
            })
        } 
    }catch(error){
        console.error(error);
    }
}
exports.postCategory = postCategory;
exports.getCategory = getCategory;
exports.updateCategory = updateCategory;
exports.deleteCategory = deleteCategory;