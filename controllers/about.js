'use strict';

const logger = require('../utils/logger');
const commentstore  = require('../models/commentstore.js');

const about = {
  index(request, response) {
    logger.info('about rendering');
    const viewData = {
      title: 'About Sitemark 1',
      comments: commentstore.getAllComments(),
    };
    response.render('about', viewData);
  },

      addComment(request, response){
    	const newComment={
    		comment: request.body.comment,
    	};
    	commentstore.addComment(newComment);
    	response.redirect('/about');
    },

};

module.exports = about;
