var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ArticleSchema = new Schema({
    title: { type: String, required: true },
    description: {type: String, required: true},
    requirements: { type: String, required: true },
    deliveryTime: {type: Number, required: true},
    price: { type: Number, required: true },
});
module.exports = mongoose.model('Article', ArticleSchema);
