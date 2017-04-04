'use strict';

const logger = require('../utils/logger');
const linkstore  = require('../models/linkstore.js');

const viewlinklist = {
    index(request, response){
        const linklistId = request.params.id;
        logger.debug('Linklist id= ', linklistId);
        const viewData = {
            title: "Linklist",
            linklist: linkstore.getLink(linklistId),
        };
        response.render('viewlinklists', viewData);
    },
};

module.exports = viewlinklist;

