'use strict';

const _ = require('lodash');
const JsonStore = require('./json-store');

const userStore = {

    store: new JsonStore('./models/userstore.json', {users: []}),
    collection: 'users',

    getAllUsers() {
        return this.store.findAll(this.collection);
    },

    addUser(user) {
        this.store.add(this.collection, user);
    },

    getUserById(id) {
        return this.store.findOneBy(this.collection, {id: id});
    },

    getUserByEmail(email) {
        return this.store.findOneBy(this.collection, {email: email});
    },


    getCurrentUser(email) {
        return this.getUserByEmail(email);
    }
};


module.exports = userStore;