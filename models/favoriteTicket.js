var mongoose = require('mongoose');

var favoriteTicketSchema = new mongoose.Schema({
	title: String,
	auctionUrl: String,
	description: String,
	price: String,
	type: String,
	user: String
});

favoriteTicketSchema.index({auctionUrl: 1, user: 1}, {unique: true});

module.exports = mongoose.model('favoriteTicket', favoriteTicketSchema);
