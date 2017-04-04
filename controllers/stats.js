'use strict';

const logger = require('../utils/logger');
const linkstore = require('../models/linkstore.js');

const stats = {
    index(request, response) {

        const currentUser = request.cookies.linklist;
        logger.info('about rendering');
        const viewData = {
            title: 'Sitemark Stats',
            linkCount: linkstore.getLinkCount(),
            linkListCount : linkstore.getLinkListCount(),
            myLinkListCount : linkstore.getMyLinkListCount(currentUser),
            myLinkCount :  linkstore.getMyLinkCount(currentUser),
            mostlinks : linkstore.mostLinks(),
            leastlinks : linkstore.leastLinks(),
            avgLinks : linkstore.averageLinks(),
            mostUserLists : linkstore.mostUserLists(),
            leastUserLists: linkstore.leastUserLists(),
        };
        response.render('stats', viewData);
    },
};

module.exports = stats;