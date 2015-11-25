// include packages to our project

var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var cors = require('cors');

var favoriteTicket = require('./models/favoriteTicket');
var favoriteTicketController = require('./_controllers/favoriteTicketController');

//connecting to DB
mongoose.connect('mongodb://localhost:27017/ticket-manager');

// create the app itself

var app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());

var router = express.Router();

router.route('/favorite')
    .post(favoriteTicketController.postFavoriteTickets)
    .get(favoriteTicketController.getFavoriteTickets);

router.route('/favorite/:favoriteTicket_id')
    .get(favoriteTicketController.getFavoriteTicket)
    .put(favoriteTicketController.putFavoriteTicket)
    .delete(favoriteTicketController.deleteFavoriteTicket);

app.use('/tickets', router);

app.listen(3000);

console.log('App initialised');
