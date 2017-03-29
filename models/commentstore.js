'use strict';

const _ =require('lodash');
const JsonStore = require('./json-store');

 const commentstore ={

  store: new JsonStore('./models/commentstore.json', { comments: [] }),
  collection: 'comments',

    getAllComments(){
  	return this.store.findAll(this.collection);
  },

    addComment(comment) {
	this.store.add(this.collection, comment);
  },

};

module.exports = commentstore; 