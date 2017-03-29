'use strict';
const userstore = require('../models/userstore');
const logger = require('../utils/logger');
const uuid = require('uuid');

const accounts = {

    index(request, response) {
        const viewData = {
            title: 'Login or Signup',
        };
        response.render('index', viewData);
    },

    login(request, response) {
        const viewData = {
            title: 'Login to the Service',
        };
        response.render('login', viewData);
    },

    logout(request, response) {
        response.cookie('linklist', '');
        response.redirect('/');
    },

    signup(request, response) {
        const viewData = {
            title: 'Login to the Service',
        };
        response.render('signup', viewData);
    },

    register(request, response) {
        const user = request.body;
        user.id = uuid();
        userstore.addUser(user);
        logger.info(`registering ${user.email}`);
        response.redirect('/');
    },

    authenticate(request, response) {
        const user = userstore.getUserByEmail(request.body.email);
        if (user && user.password == request.body.password) {
            response.cookie('linklist', user.email);
            logger.info(`logging in ${user.email}`);
            response.redirect('/dashboard');
        } else {
            response.redirect('/login');
        }
    },

};
module.exports = accounts;

