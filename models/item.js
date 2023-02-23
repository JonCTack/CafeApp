const mongoose= require('mongoose');
const itemSchema = require('./itemSchema');


const Item = mongoose.model('Items', itemSchema);


module.exports = Item;