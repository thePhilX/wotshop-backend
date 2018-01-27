var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ArticleSchema = new Schema({
    title: { type: String, required: true },
    description: {type: String, required: true},
    price: { type: Number, required: true }, // TODO save in € / $ ?
    requirements: { type: String, required: true }, // TODO maybe as array ?
    deliveryTime: {type: Number, required: true}, // in days
    timestamp: {type: Date, required: true, default: Date.now() }
});
module.exports = mongoose.model('Article', ArticleSchema);
