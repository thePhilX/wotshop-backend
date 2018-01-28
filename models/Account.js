var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var AccountSchema = new Schema({
    wotEmail: { type: String, required: true },
    wotPassword: { type: String, required: true },
    server: {type: String, required: true}
});

module.exports = mongoose.model('Account', AccountSchema);
