'use strict';

const uuid = require('uuid');
const logger = require('../utils/logger');
const linkstore  = require('../models/linkstore.js');

const linklist = {
	 index(request, response){
	 const linklistId = request.params.id;
     logger.debug('Linklist id= ', linklistId);
		const viewData ={
			title: "Linklist",
			linklist:linkstore.getLink(linklistId),
		};
		response.render('linklist', viewData);
	},

 	deleteLink(request, response){
	 const linklistId = request.params.id;
	 const linkId = request.params.linkid;

	 logger.debug("Deleting link ${linkId} from linklist ${linklistId}");
	 linkstore.removeLink(linklistId, linkId);
	 response.redirect("/linklist/"+ linklistId);
    },

    addLink(request, response){
     const linklistId = request.params.id;
     const linklist = linkstore.getLink(linklistId);
     const newLink = {
     	id: uuid(),
     	title: request.body.title,
     	link: "https://"+request.body.link,
     	sum: request.body.sum,
     };
     linkstore.addLink(linklistId, newLink);
     response.redirect('/linklist/' + linklistId);
    },



};

module.exports = linklist;