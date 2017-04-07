'use strict';

const _ = require('lodash');
const JsonStore = require('./json-store');
const cloudinary = require('cloudinary');
const path = require('path');
const logger = require('../utils/logger');

try {
    const env = require('../.data/.env.json');
    cloudinary.config(env.cloudinary);
}
catch(e) {
    logger.info('You must provide a Cloudinary credentials file - see README.md');
    process.exit(1);
}

const pictureStore = {

    store: new JsonStore('./models/picturestore.json', {pictures: []}),
    collection: 'pictures',

    getAllPictures(){
        return this.store.findAll(this.collection);
    },

    addCover(id, title, imageFile, response){

        imageFile.mv('tempimage', err => {
            if (!err) {
                cloudinary.uploader.upload('tempimage', result => {
                    console.log(result);
                    const picture = {
                        img: result.url,
                        title: title,
                        listid: id,
                    };
                    this.store.add(this.collection, picture);
                    response();
                });
            }
        });
    },

    deletePicture(userId, image) {
        const id = path.parse(image);
        let album = this.getAlbum(userId);
        _.remove(album.photos, {img: image});
        cloudinary.api.delete_resources([id.name], function (result) {
            console.log(result);
        });
    },

    findCover(linkId){
        const pictures = this.store.findAll(this.collection);
        const linklist = linkstore.getAllLinklists();
        for(let i = 0; i > pictures.length; i++){
            if(pictures[i].listId == linkId){
                linklist.linkId['img']=  pictures[i].img;
            }
        }
    }
};

module.exports = pictureStore;