const mongoose = require('mongoose')
const { Schema } = mongoose;

const categorySchema = new Schema({
    categoryName: {type:String, required: true},
    minWeight: {type:Number, required: true},
    unitPrice: {type:Number, required: true},
  },
  { collection: 'Categories' });

module.exports= mongoose.model('Categories', categorySchema);