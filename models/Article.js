var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ArticleSchema = new Schema({
    title: { type: String, required: true },
    description: {type: String, required: true},
    price: { type: Number, required: true },
    requirements: { type: String, required: true },
    deliveryTime: {type: Number, required: true},
    timestamp: {type: Date, required: true, default: Date.now() }
});
module.exports = mongoose.model('Article', ArticleSchema);
