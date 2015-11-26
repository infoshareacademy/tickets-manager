var schedule = require('node-schedule');
var mailer = require('express-mailer');


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

    var j = schedule.scheduleJob('*/10 * * * * *', function () {
        console.log('The answer to life, the universe, and everything!');

        sendMail('grancen@wp.pl');
        sendMail('ole_1@wp.pl');


    });

    var sendMail = function(mailAddress) {
        app.mailer.send('email', {
            to: mailAddress,
            subject: 'Test Email', // REQUIRED.
            otherProperty: 'Other Property' // All additional properties are also passed to the template as local variables.
        }, function (err) {
            if (err) {
                // handle error
                console.log(err);
                console.log('There was an error sending the email');
                return;
            }
            console.log('Send Mail :D');
        });
    }
};



