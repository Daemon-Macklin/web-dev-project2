'use strict';
const _ =require('lodash');
const JsonStore = require('./json-store');
const userStore = require('./userstore');
const accounts = require('../controllers/accounts.js');

const linkstore = {

  store: new JsonStore('./models/linkstore.json', { linkCollection: [] }),
  collection: 'linkCollection',

  getAllLinklists(){
  	return this.store.findAll(this.collection);
  },

  getLinklist(linklistId){
      return this.store.findOneBy(this.collection,{id: linklistId})
  },

  getPublicLists(){
    const allLists = this.store.findAll(this.collection);
    const publicLists = {};
     for(let i = 0; i < allLists.length; i++){
         if(allLists[i].public){
             publicLists[i] = allLists[i];
         }
     }
     return publicLists;
  },

  getLink(id){
  	return this.store.findOneBy(this.collection, {id: id});
  },

  removeLink(id, linkId){
  	const linklist = this.getLink(id);
  	const links = linklist.links;
  	_.remove(linklist.links, { id: linkId });
  },

  removeLinkList(id) {
    const linklist = this.getLink(id);
    this.store.remove(this.collection, { id: id });
  },

  addLink(id, link){
  	const linklist = this.getLink(id);
  	linklist.links.push(link);
  },

  addLinkList(linklist) {
	this.store.add(this.collection, linklist);
  },

  getLinkCount() {
    const linklist = this.getAllLinklists();
    let count = 0;

     for (let i = 0; i < linklist.length; i++){

     	count += linklist[i].links.length;
     	}
     return count; 
    },

    getLinkListCount(){
      const linklist = this.getAllLinklists();
      return linklist.length;
    },

    getMyLinkListCount(email){
        const userid = userStore.getCurrentUser(email).id;
        const linklist = this.getUserLinkList(userid);
        return linklist.length;
    },

    getMyLinkCount(email){
        let count = 0;
        const userid = userStore.getCurrentUser(email).id;
        const linklist = this.getUserLinkList(userid);
        for(let i=0; i < linklist.length; i++ ){
            count += linklist[i].links.length;
        }
        return count;
    },

    mostLinks(){
        const linklist = this.getAllLinklists();
        let mostlinks = {'title':'empty', 'count':0};
        let highest = 0;
        for(let i=0; i < linklist.length; i++){
            if(linklist[i].links.length > highest){
                mostlinks['title']= linklist[i].title;
                mostlinks['count']= linklist[i].links.length;
                highest = linklist[i].links.length;
            }
        }
        return mostlinks;
    },

    leastLinks(){
        const linklist = this.getAllLinklists();
        let leastlinks = {'title':'empty', 'count':0};
        let lowest = .5;
        for(let i=0; i < linklist.length; i++){
            if(linklist[i].links.length < lowest){
                leastlinks['title']= linklist[i].title;
                leastlinks['count']= linklist[i].links.length;
                lowest = linklist[i].links.length;
            }
        }
        return leastlinks;
    },

    averageLinks(){
      const links = this.getLinkCount();
      const linkLists = this.getLinkListCount();
      return links/linkLists;
    },

    mostUserLists(){
        
    },

    getUserLinkList(userid){
        return this.store.findBy(this.collection, { userid: userid });
    },
};

module.exports = linkstore;
