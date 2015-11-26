var mongoose = require('mongoose');

var favoriteTicketSchema = new mongoose.Schema({
	title: String,
	auctionUrl: {
		type: String,
		index: {
			unique: true
		}
	},
	description: String,
	price: Number,
	type: String
});

module.exports = mongoose.model('favoriteTicket', favoriteTicketSchema);
