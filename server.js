var express = require('express');
var app = express();

var router = express.Router();

app.set('view engine', 'ejs');

app.get('/favorites', function (req, res) {
    var favoriteTickets = [
        {
            title: 'Bilety Judas Priest Golden Circle 10.12 NAJTANIEJ',
            auctionUrl: 'http:\/\/allegro.pl\/show_item.php?item=5810179925',
            description: '',
            price: 15,
            type: 'music'
        },
        {
            title: 'Bilet na koncert Marcusa Millera Gdynia 1',
            auctionUrl: '',
            description: 'vyubimk mnbvcgfyhujn bgcfyuhjkn bvghujknbvfyguij',
            price: 315,
            type: 'music'
        },
        {
            title: 'Bilety sezon letni Lechia Gdansk',
            auctionUrl: '',
            description: 'dfghjkl;lkjhgfdrtyuiogfcv bnmkiuytgfv bnmiuygv nkiuygfvcbnjuyg',
            price: 135,
            type: 'sport'
        },
        {
            title: 'Bilet mecz Arka Gdynia',
            auctionUrl: '',
            description: '',
            price: 35,
            type: 'sport'
        }
    ];

    var title = 'Osoby!';

	res.render('pages/index', {
        family: people,
        title: title
    });
});

app.use('/tickets', router)

app.listen(3000);

console.log('App initialised');
