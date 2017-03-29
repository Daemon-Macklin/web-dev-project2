'use strict';

const logger = require('../utils/logger');
const linkstore = require('../models/linkstore.js');


const start = {
  index(request, response) {
    logger.info('start rendering');
    const viewData = {
      title: 'Welcome to Sitemark 1',
      linkCount: linkstore.getLinkCount()
    };
    response.render('start', viewData);
  },
};

module.exports = start;
