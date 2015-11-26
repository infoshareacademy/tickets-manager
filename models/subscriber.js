var mongoose = require('mongoose');

var subscriberSchema = new mongoose.Schema({
    name: String,
    email: {
        type: String,
        unique: true,
        required: true
    }
});

module.exports = mongoose.model('subscriber', subscriberSchema);