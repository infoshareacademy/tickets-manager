var express = require('express');
var router = express.Router();
var favoriteTicketController = require('../_controllers/favoriteTicketController');
var subscriberController = require('../_controllers/subscriberController');

var isAuthenticated = function (req, res, next) {
	// if user is authenticated in the session, call the next() to call the next request handler 
	// Passport adds this method to request object. A middleware is allowed to add properties to
	// request and response objects
	if (req.isAuthenticated())
		return next();
	// if the user is not authenticated then redirect him to the login page
	res.redirect('/');
}

module.exports = function(passport){

	/* GET login page. */
	router.get('/', function(req, res) {
    	// Display the Login page with any flash message, if any
		res.render('index', { message: req.flash('message') });
	});

	/* Handle Login POST */
	router.post('/login', passport.authenticate('login', {
		successRedirect: '/home',
		failureRedirect: '/',
		failureFlash : true  
	}));

	/* GET Registration Page */
	router.get('/signup', function(req, res){
		res.render('register',{message: req.flash('message')});
	});

	/* Handle Registration POST */
	router.post('/signup', passport.authenticate('signup', {
		successRedirect: '/home',
		failureRedirect: '/signup',
		failureFlash : true  
	}));

	/* GET Home Page */
	router.get('/home', isAuthenticated, function(req, res){
		res.render('home', { user: req.user });
	});

	/* Handle Logout */
	router.get('/signout', function(req, res) {
		req.logout();
		res.redirect('/');
	});



	router.route('/fav-tickets')
		.post(favoriteTicketController.postFavoriteTickets)
		.get(favoriteTicketController.getFavoriteTickets);

	router.route('/fav-tickets/:favoriteTicket_id')
		.get(favoriteTicketController.getFavoriteTicket)
		.delete(favoriteTicketController.deleteFavoriteTicket);

	router.route('/subscribers')
		.get(subscriberController.getSubscribers)
		.post(subscriberController.postSubscriber);

	router.route('/subscribers/:subscriber_id')
		.delete(subscriberController.deleteSubscriber);
    
    // route for facebook authentication and login
	// different scopes while logging in
	router.get('/login/facebook', 
		passport.authenticate('facebook', { scope : 'email' }
	));

	// handle the callback after facebook has authenticated the user
	router.get('/login/facebook/callback',
		passport.authenticate('facebook', {
			successRedirect : '/home',
			failureRedirect : '/'
		})
	);
    
	return router;
}

