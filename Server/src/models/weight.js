const mongoose = require('mongoose')
const { Schema } = mongoose;

const weightSchema = new Schema({
    productWeight: {type:Number, required: true},
    productType: {type:String, required: true},
    unitPrice: {type:Number, required: true},
  },
  { collection: 'weightmapping' });

module.exports= mongoose.model('Weight', weightSchema);