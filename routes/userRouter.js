const express = require('express');
const userRoutesApi = express.Router();
const userApi = require('../modules/userApi');

userRoutesApi.route('/')
    .get(userApi.getAllUsers)
    .post(userApi.postUser);

userRoutesApi.route('/:id')
    .get(userApi.getUser)
    .put(userApi.updateUser)
    .delete(userApi.removeUser);

userRoutesApi.route('/authenticate')
    .post(userApi.authenticate);

module.exports = userRoutesApi;
