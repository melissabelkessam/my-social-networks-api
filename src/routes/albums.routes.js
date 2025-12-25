const express = require('express');
const router = express.Router();
const albumsController = require('../controllers/albums.controller');

// Routes pour les albums
router.post('/', albumsController.createAlbum);
router.get('/event/:eventId', albumsController.getAlbumsByEvent);
router.delete('/:id', albumsController.deleteAlbum);

// Routes pour les photos
router.post('/:albumId/photos', albumsController.addPhoto);
router.get('/:albumId/photos', albumsController.getPhotos);
router.delete('/photos/:photoId', albumsController.deletePhoto);

// Routes pour les commentaires
router.post('/photos/:photoId/comments', albumsController.addComment);
router.get('/photos/:photoId/comments', albumsController.getComments);
router.delete('/comments/:commentId', albumsController.deleteComment);

module.exports = router;