'use strict';

const express = require('express');
const router = express.Router();

const start = require('./controllers/start');
const dashboard = require('./controllers/dashboard.js');
const about = require('./controllers/about.js');
const linklist = require('./controllers/linklist.js');
const accounts = require ('./controllers/accounts.js');
const stats = require ('./controllers/stats.js');
const view = require('./controllers/view.js');
const viewlinklist = require('./controllers/viewlinklist.js');

router.get('/', accounts.index);
router.get('/login', accounts.login);
router.get('/start', start.index);
router.get('/signup', accounts.signup);
router.get('/logout', accounts.logout);
router.get('/dashboard', dashboard.index);
router.get('/about', about.index);
router.get('/linklist/:id', linklist.index);
router.get('/stats', stats.index);
router.get('/view', view.index);
router.get('/viewlinklist/:id', viewlinklist.index);
router.get('/linklist/:id/deletelink/:linkid', linklist.deleteLink);
router.get('/dashboard/deletelinklist/:id', dashboard.deleteLinkList);
router.get('/dashboard/makepublic/:id', dashboard.makePublic);
router.get('/dashboard/makeprivate/:id', dashboard.makePrivate);
router.get('/view/like/:id', view.like);
router.post('/linklist/:id/addlink', linklist.addLink);
router.post('/dashboard/addlinklist', dashboard.addLinkList);
router.post('/about/addcomment', about.addComment);
router.post('/register', accounts.register);
router.post('/authenticate', accounts.authenticate);



module.exports = router;
