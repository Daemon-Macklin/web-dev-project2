'use strict';

const logger = require('../utils/logger');
const linkstore = require('../models/linkstore.js');

const view = {
    index(request, response) {
        const currentUser = request.cookies.linklist;
        logger.info('about rendering');
        const viewData = {
            title: 'Sitemark Views',
            publicLists : linkstore.getPublicLists(),
        };
        response.render('view', viewData);
    },
};

module.exports = view;

