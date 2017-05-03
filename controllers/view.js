'use strict';

const logger = require('../utils/logger');
const linkstore = require('../models/linkstore.js');

const view = {
    index(request, response) {
        const currentUser = request.cookies.linklist;
        logger.info('about rendering');
        const viewData = {
            title: 'Sitemark Views',
            publicLists: linkstore.getPublicLists(),
        };
        response.render('view', viewData);
    },

    like(request, response){
        const currentUser = request.cookies.linklist;
        const listId = request.params.id;
        const list = linkstore.getLinklist(listId);
        let count = 0;
        for (let i = 0; i < list.likes.length; i++) {
            if (currentUser === list.likes[i]) {
                count += 1;
            }
        }
        if(count == 0){
            list.likes.push(currentUser);
        }
        response.redirect("/view");
    },
};

module.exports = view;

