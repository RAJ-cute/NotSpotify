const jwt = require('jsonwebtoken');
const MusicModel = require(
    '../models/music.model');
const albumModel = require('../models/album.model');

async function createMusic(req, res) {
    const token = req.cookies.token;

    

        const { title, uri } = req.body;

        const music = await MusicModel.create({
            title,
            uri,
            artist: req.user.id
        });

        res.status(201).json({
            message: "Music uploaded successfully",
            music
        });

    }

async function createAlbum(req, res) {
    const token = req.cookies.token;
    
    
        const { title, musics } = req.body;
        const album = await albumModel.create({ 
            title,
            artist: req.user.id,
            musics:musics
         });
        res.status(201).json({ message: "Album created", album:{
            id: album._id,
            title: album.title,
            artist: album.artist,
            musics: album.musics
        } });
    }
   
async function getAllMusics(req, res) {
    const musics = await MusicModel
     .find()
     
     .limit(20)
    .populate('artist', 'name email');
    res.status(200).json({ message: "All musics", musics: musics });
}
async function getAllAlbums(req, res) {
    const albums = await albumModel
        .find()
        .select('title artist')
        .populate('artist', 'name email');

    res.status(200).json({
        message: "All albums",
        albums
    });
}
async function getAlbumById(req, res) {
    const albumId  = req.params.albumId;
    const album = await albumModel
        .findById(albumId)
        .populate('artist', 'name email')
        .populate('musics', 'title uri');
        res.status(200).json({
            message: "Album details",
            album:album
        });
}

module.exports = { createMusic, createAlbum, getAllMusics, getAllAlbums, getAlbumById };