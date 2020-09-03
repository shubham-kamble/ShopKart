var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var ProductSchema = new Schema({
    name:String,
    desc:String,
    price:String,
    image:String,
    category:String
});

// ProductSchema.index({name: 'text', desc: 'text', category:'string'});
ProductSchema.index({'$**': 'text'});

module.exports = mongoose.model('Product',ProductSchema);