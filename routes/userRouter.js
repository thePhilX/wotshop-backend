const express=require("express");
const userRoutesApi=express.Router();
const userApi=require("../modules/userAPI");

userRoutesApi.route("/users")
    .get(userApi.getAllUsers)
    .post(userApi.postUser);

userRoutesApi.route("/users/:id")
    .get(userApi.getUser)
    .put(userApi.updateUser)
    .delete(userApi.removeUser);

userRoutesApi.route("/authenticate")
    .post(userApi.authenticate);

module.exports = userRoutesApi;
