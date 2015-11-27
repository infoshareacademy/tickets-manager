var schedule = require('node-schedule');
var mailer = require('express-mailer');
var Subscriber = require('../models/subscriber.js');
var q = require('q');
var http = require('http');


exports.cron = function (app) {

    mailer.extend(app, {
        from: 'papikaanteam2@gmail.com',
        host: 'smtp.gmail.com', // hostname
        secureConnection: true, // use SSL
        port: 465, // port for secure SMTP
        transportMethod: 'SMTP', // default is SMTP. Accepts anything that nodemailer accepts
        auth: {
            user: 'papikaanteam2',
            pass: 'papikaan123'
        }
    });

    //var j = schedule.scheduleJob('* * * 1 * *', function () {
    //    console.log('The answer to life, the universe, and everything!');
    //    Subscriber.find({}, function (err, subscribers) {
    //        subscribers.forEach(function(people) {
    //            sendMail(people);
    //        });
    //    });

    //});

    var sendMail = function(subscriber) {
        getTickets().then(function (tickets){
            app.mailer.send('email', {
                to: subscriber['email'],
                subject: subscriber['name'] + ' check actually ticket\'s auctions in 3City', // REQUIRED.
                tickets: tickets
            }, function (err) {
                if (err) {
                    // handle error
                    console.log(err);
                    console.log('There was an error sending the email');
                    return;
                }
                console.log('Send Mail :D');
            });
        })

    };

    var getTickets = function () {
        var dfd = q.defer();
        http.get('http://test.tickets-processor.infoshareaca.nazwa.pl/import', function (res, err) {
            if (err) {
                dfd.reject(err);
                console.log(err);
            }

            var body = '';
            res.on('data', function (d) {
                body += d;
            });

            res.on('end', function () {
                dfd.resolve(JSON.parse(body));
            });

        });
        return dfd.promise;
    };
};



