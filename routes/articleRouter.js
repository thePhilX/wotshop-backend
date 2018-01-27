const express = require('express');
const articleRoutesApi = express.Router();
const articleApi = require('../modules/articleApi');

articleRoutesApi.route('/')
    .get(articleApi.getAllArticles)
    .post(articleApi.postArticle);

articleRoutesApi.route('/:id')
    .get(articleApi.getArticle)
    .put(articleApi.updateArticle)
    .delete(articleApi.removeArticle);

module.exports = articleRoutesApi;
