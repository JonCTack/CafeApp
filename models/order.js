const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const itemSchema = require('./itemSchema');

const orderItemSchema = new Schema({
    quantity: { type: Number, default: 1 },
    item: itemSchema,
    }, 
    {timestamps: true, 
    toJSON: {virtuals: true}
    });

orderItemSchema.virtual('totalPrice').get(() => {
        return (this.quantity * this.item.price);
    });

const orderSchema = new Schema({
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    checkoutDone: {type: Boolean, default: false},
    orderItems: [orderItemSchema],
    }, 
    {timestamps: true, 
    toJSON: {virtuals: true}
    });


orderSchema.statics.getCart = function (userID) {
    return this.findOneAndUpdate(
        { user: userID, checkoutDone: false },
        { user: userID },
        { upsert: true, new: true }
    )
}
// orderSchema.virtual('orderTotal').get(() => {
//         return this.orderItems.reduce()
//     });

module.exports = mongoose.model('Order', orderSchema);