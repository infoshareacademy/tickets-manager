var Subscriber = require('../models/subscriber.js');

exports.getSubscribers = function (req, res) {
  Subscriber.find(function (err, subscribers) {
      if(err) {
         res.send(err);
      }
      res.json(subscribers);
  });
};

exports.postSubscriber = function(req, res) {
    var subscriber = new Subscriber;

    subscriber.name = req.body.name;
    subscriber.email = req.body.email;

    subscriber.save(function(err) {
        if(err) {
            res.status(409).send(err);

        }
        else {
            res.json({
                message: 'Your email was add to subscriber\'s list',
                data: subscriber
            });
        }
    });
};

exports.deleteSubscriber = function (req, res) {
    Subscriber.findByIdAndRemove(req.params.subscriber_id, function (err) {
        if (err) {
            res.send(err);
        }
        res.json({
            message: 'Your mail was delete'
        });
    })
};