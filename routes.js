'use strict';

const express = require('express');
const router = express.Router();

const start = require('./controllers/start');
const dashboard = require('./controllers/dashboard.js');
const about = require('./controllers/about.js');
const linklist = require('./controllers/linklist.js');
const accounts = require ('./controllers/accounts.js');
const stats = require ('./controllers/stats.js');

router.get('/', accounts.index);
router.get('/login', accounts.login);
router.get('/signup', accounts.signup);
router.get('/logout', accounts.logout);
router.get('/dashboard', dashboard.index);
router.get('/about', about.index);
router.get('/linklist/:id', linklist.index);
router.get('/stats', stats.index);
router.get('/linklist/:id/deletelink/:linkid', linklist.deleteLink);
router.get('/dashboard/deletelinklist/:id', dashboard.deleteLinkList);
router.get('/dashboard/deleteallpictures', dashboard.deleteAllPictures);
router.get('/dashboard/deletepicture', dashboard.deletePicture);
router.post('/linklist/:id/addlink', linklist.addLink);
router.post('/dashboard/addlinklist', dashboard.addLinkList);
router.post('/about/addcomment', about.addComment);
router.post('/register', accounts.register);
router.post('/authenticate', accounts.authenticate);
router.post('/dashboard/uploadpicture', dashboard.uploadPicture);


module.exports = router;
