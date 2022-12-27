const mongoose = require('mongoose')
const { Schema } = mongoose;

const usersSchema = new Schema({
    name: {type:String, required: true},
    email: {type:String, required: true},
    phoneNumber: {type:Number, required: true},
    password:  {type:String, required: true},
    userRole:  {type:String, required: true},
    permanentAddress:  {type:String, required: true},
    temporaryAddress: {type:String, required: true},
    country:  {type:String, required: true},
    zipCode: {type:Number, required: true},
  },
  { collection: 'users' });

module.exports= mongoose.model('Users', usersSchema);
