
// const mongoose_fuzzy_searching = require('mongoose-fuzzy-searching');
const mongoose = require('mongoose')
const { Schema } = mongoose;

const ordersSchema = new Schema({
    productType: { type: String, required: true },
    productWeight: { type: String, required: true },
    senderLocation: { type: String, required: true },
    receipentLocation: { type: String, required: true },
    currentDistance: { type: Number, required: true },
    senderLocationDetails: { type: String, required: true },
    recepientLocationDetails: { type: String, required: true },
    senderName: { type: String, required: true },
    rejectedReasons: { type: String},
    receipentName: { type: String, required: true },
    receipentNumber: { type: Number, required: true },
    expectedDeliveryDate: { type: String, required: true },
    expectedDeliveryTime: { type: String, required: true },
    orderStatus: { type: String, default: 'pending' },
    userID: { type: String, required: true },
    orderImg: { type: String },
    orderCount: { type: Number, default: 0}
  },
  { collection: 'Orders' });
  // ordersSchema.plugin(mongoose_fuzzy_searching, { fields: ['senderName']})

module.exports= mongoose.model('Orders', ordersSchema);