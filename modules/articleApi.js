// get the article model
const Article = require('../models/article');

var API = {};

API.getAllArticles = function(req, res) {
   Article.find(function(err, articles) {
       if (err) {
           return res.status(500).send(err);
       }
       return res.status(200).send(articles);
   });
};

API.getArticle = function(req, res) {
   Article.findOne({
       _id: req.params.id
   }, function(err, article) {
       if (err) {
           return res.status(400).send(err);
       }
       return res.status(200).send(article);
   });
};

API.postArticle = function(req, res) {
   var newArticle = new Article({
       title: req.body.title,
       // TODO images
       description: req.body.description,
       price: req.body.price,
       requirements: req.body.requirements,
       deliveryTime: req.body.deliveryTime,
       timestamp: req.body.timestamp
   });
   newArticle.save(function(err, saveRes) {
       if (err) {
           return res.status(500).send(err);
       }
       return res.status(200).send(saveRes);
   });
};

API.updateArticle = function(req, res) {
   Article.findOne({
       _id: req.params.id
   }, function(findErr, article) {
       if (findErr) {
           return res.status(400).send(findErr);
       }
       var updatedArticle = article;
       if (req.body.title) updatedArticle.title = req.body.title;
       // TODO images
       if (req.body.description) updatedArticle.description = req.body.description;
       if (req.body.price) updatedArticle.price = req.body.price;
       if (req.body.requirements) updatedArticle.requirements = req.body.requirements;
       if (req.body.deliveryTime) updatedArticle.deliveryTime = req.body.deliveryTime;
       if (req.body.timestamp) updatedArticle.timestamp = req.body.timestamp;

       return updatedArticle.save(function(saveErr, saveRes) {
           if (saveErr) {
               return res.status(500).send(saveErr);
           }
           return res.status(200).send(saveRes);
       });
   });
};

API.removeArticle = function(req, res) {
   Article.remove({
       _id: req.params.id
   }, function(err, removeRes) {
       if (err) {
           return res.status(400).send(err);
       }
       return res.status(200).send(removeRes);

   });
};

module.exports = API;
