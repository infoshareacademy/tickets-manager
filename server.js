// include packages to our project

var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var cors = require('cors');

var favoriteTicket = require('./models/favoriteTicket');
var favoriteTicketController = require('./_controllers/favoriteTicketController');
var subscriberController = require('./_controllers/subscriberController');
var newsletterController = require('./_controllers/newsletterController');

//connecting to DB
mongoose.connect('mongodb://localhost:27017/ticket-manager');

// create the app itself

var app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());

app.set('view engine', 'jade');

var router = express.Router();

router.route('/fav-tickets')
    .post(favoriteTicketController.postFavoriteTickets)
    .get(favoriteTicketController.getFavoriteTickets);

router.route('/fav-tickets/:favoriteTicket_id')
    .get(favoriteTicketController.getFavoriteTicket)
    .put(favoriteTicketController.putFavoriteTicket)
    .delete(favoriteTicketController.deleteFavoriteTicket);

router.route('/subscribers')
    .get(subscriberController.getSubscribers)
    .post(subscriberController.postSubscriber);

router.route('/subscribers/:subscriber_id')
    .delete(subscriberController.deleteSubscriber);

newsletterController.cron(app);

app.use('', router);


app.listen(3000);

console.log('App initialised');
