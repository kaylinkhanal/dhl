const mongoose = require('mongoose')
const { Schema } = mongoose;

const usersSchema = new Schema({
    name: {type:String, unique: true},
  },
  { collection: 'users' });

module.exports= mongoose.model('Users', usersSchema);
