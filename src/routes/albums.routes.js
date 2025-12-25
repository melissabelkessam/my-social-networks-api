const express = require('express');
const router = express.Router();
const albumsController = require('../controllers/albums.controller');
const { createAlbumValidator, addPhotoValidator, addCommentValidator, validate } = require('../validators/albums.validator');

// Routes pour les albums
router.post('/', createAlbumValidator, validate, albumsController.createAlbum);
router.get('/event/:eventId', albumsController.getAlbumsByEvent);
router.delete('/:id', albumsController.deleteAlbum);

// Routes pour les photos
router.post('/:albumId/photos', addPhotoValidator, validate, albumsController.addPhoto);
router.get('/:albumId/photos', albumsController.getPhotos);
router.delete('/photos/:photoId', albumsController.deletePhoto);

// Routes pour les commentaires
router.post('/photos/:photoId/comments', addCommentValidator, validate, albumsController.addComment);
router.get('/photos/:photoId/comments', albumsController.getComments);
router.delete('/comments/:commentId', albumsController.deleteComment);

module.exports = router;