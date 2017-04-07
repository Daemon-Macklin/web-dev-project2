'use strict';

const logger = require('../utils/logger');
const userStore  = require('../models/userstore.js');
const uuid = require('uuid');
const accounts = require('./accounts.js');
const linkstore = require('../models/linkstore.js');
const pictureStore = require('../models/picturestore.js');

const dashboard = {

  index(request, response) {
    logger.info('dashboard rendering');
    const loggedInUser = userStore.getCurrentUser(request.cookies.linklist);
    const viewData = {
      title: 'Bookmarked links',
      links: linkstore.getUserLinkList(loggedInUser.id),
        album: pictureStore.getAlbum(loggedInUser.id),
    };
     logger.info('about to render', linkstore.getAllLinklists());
    response.render('dashboard', viewData);
  },

   	deleteLinkList(request, response){
	 const linklistId = request.params.id;

	 logger.debug("Deleting linklist ${linklistId}");
	 linkstore.removeLinkList(linklistId);
	 response.redirect("/dashboard")
    },

    addLinkList(request, response){
        const loggedInUser = userStore.getCurrentUser(request.cookies.linklist);
    	const newLinkList={
    		id: uuid(),
			userid: loggedInUser.id,
    		title: request.body.title,
            public: false,
    		links:[],
    	};
    	linkstore.addLinkList(newLinkList);
    	dashboard.uploadCover(request,newLinkList.id);
    	logger.debug("Adding linklist ${linklistId}");
        response.redirect('/dashboard');
    },


    uploadCover(request, id){
        const loggedInUser = userStore.getCurrentUser(request.cookies.linklist);
        pictureStore.addCover(loggedInUser.id, id,request.files.cover, function () {
        })
    },


    deleteAllPictures(request, response) {
        const loggedInUser = userStore.getCurrentUser(request.cookies.linklist);
        pictureStore.deleteAllPictures(loggedInUser.id);
        response.redirect('/dashboard');
    },

    deletePicture(request, response) {
        const loggedInUser = userStore.getCurrentUser(request.cookies.linklist);
        pictureStore.deletePicture(loggedInUser.id, request.query.img);
        response.redirect('/dashboard');
    },

    makePublic(request, response){
        const linklistId = request.params.id;
        const linklist = linkstore.getLinklist(linklistId);
        linklist.public = true;
        response.redirect('/dashboard');
    },

    makePrivate(request, response){
        const linklistId = request.params.id;
        const linklist = linkstore.getLinklist(linklistId);
        linklist.public = false;
        response.redirect('/dashboard');
    },

};

module.exports = dashboard;
