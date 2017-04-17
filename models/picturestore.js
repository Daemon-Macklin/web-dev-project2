'use strict';

const _ = require('lodash');
const JsonStore = require('./json-store');
const cloudinary = require('cloudinary');
const path = require('path');
const logger = require('../utils/logger');
const linkstore = require('../models/linkstore.js');

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

    addCover(userid, id, imageFile, response){
        imageFile.mv('tempimage', err => {
            if (!err) {
                cloudinary.uploader.upload('tempimage', result => {
                    console.log(result);
                    const picture = {
                        img: result.url,
                        userid: userid,
                        listid: id,
                    };
                    this.store.add(this.collection, picture);
                });
                linkstore.getCover();
                response();
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

};

module.exports = pictureStore;