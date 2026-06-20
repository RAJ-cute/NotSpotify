const express = require('express');
const musicController = require('../controllers/music.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const router = express.Router();

router.post('/add', authMiddleware.authArtist, musicController.createMusic);
router.post('/album', authMiddleware.authArtist, musicController.createAlbum);
router.get('/', authMiddleware.authUser, musicController.getAllMusics);
module.exports = router;  
router.get("/albums", authMiddleware.authUser, musicController.getAllAlbums);
router.get("/albums/:albumId", authMiddleware.authUser, musicController.getAlbumById);