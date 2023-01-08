const mongoose = require('mongoose')
const { Schema } = mongoose;

const sizeSchema = new Schema({
    productSize: {type:Number, required: true},
    productType: {type:String, required: true},
    unitPrice: {type:Number, required: true},
  },
  { collection: 'sizemapping' });

module.exports= mongoose.model('Size', sizeSchema);