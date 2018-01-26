var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ObjectId = Schema.ObjectId;

// Models
var Article = require('./Article');

var CartSchema = new Schema({
    userID: { type: ObjectId, ref: 'User', required: true },
    articles: {
      type: [{ type: ObjectId, ref: 'Article', required: true }]
    },
    totalPrice: { type: Number, required: true }
});

module.exports = mongoose.model('Cart', CartSchema);
