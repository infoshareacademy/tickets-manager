var FavoriteTicket = require('../models/favoriteTicket');

exports.getFavoriteTickets = function (req,res) {
	FavoriteTicket.find(function(err, favoriteTickets){
		if(err){
			res.send(err);
		}
		res.json(favoriteTickets);
	});
};

//create a new favorite ticket

exports.postFavoriteTickets = function(req, res) {
	var favoriteTicket = new FavoriteTicket;
	
	favoriteTicket.title = req.body.title;
	favoriteTicket.auctionUrl= req.body.auctionUrl;
	favoriteTicket.description = req.body.description;
	favoriteTicket.price = req.body.price;
	favoriteTicket.type = req.body.type;

	favoriteTicket.save(function(err) {
		if (err) {
			res.status(409).send(err);
		} else {
		    res.json({message: 'Ticket added to favorites', data: favoriteTicket});
        }
	});
};

exports.getFavoriteTicket = function (req, res) {
    FavoriteTicket.findById(req.params.favoriteTicket_id, function(err, favoriteTicket) {
        if (err) {
            res.status(404).send(err);
        }
        res.send(favoriteTicket);
    });
};

exports.deleteFavoriteTicket = function (req, res) {
    FavoriteTicket.findByIdAndRemove(req.params.favoriteTicket_id, function(err) {
        if (err) {
            res.status(409).send(err);
        }
        res.json({message: 'Ticket removed from favorite tickets'});
    });
};