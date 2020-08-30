var mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    orderItems: [{type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true}],
    totalPrice: { type: String },
    orderedDate: { type: Date }
});

module.exports = mongoose.model("Order", orderSchema);