var mongoose = require('mongoose');

var subscriberSchema = new mongoose.Schema({
    name: String,
    mail: {
        type: String,
        index: {
            unique: true
        }
    }
});

module.exports = mongoose.model('subscriber', subscriberSchema);