'use strict';

const fileUpload = require('express-fileupload');
const express = require('express');
const logger = require('./utils/logger');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const app = express();
const exphbs = require('express-handlebars');
const path = require('path');

app.use(express.static(path.join(__dirname, '/stylesheets')));
app.use(bodyParser.urlencoded({ extended: false, }));
app.use(express.static('public'));
app.use(fileUpload());
app.engine('.hbs', exphbs({
  extname: '.hbs',
  defaultLayout: 'main',
}));
app.set('view engine', '.hbs');
app.use(cookieParser());

const routes = require('./routes');
app.use('/', routes);

const listener = app.listen(process.env.PORT || 4000, function () {
  logger.info(`gomix-template-1 started on port ${listener.address().port}`);
});
