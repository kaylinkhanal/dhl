const mongoose = require('mongoose')
const { Schema } = mongoose;

const categorySchema = new Schema({
    categoryName: {type:String, required: true},
    minWeight: {type:Number, required: true},
    minSize: {type:Number, required: true},
    minPrice: {type:Number, required: true},
  },
  { collection: 'productCategory' });

module.exports= mongoose.model('Category', categorySchema);