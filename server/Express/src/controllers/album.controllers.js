const Album = require('../models/album');
const Music = require('../models/music');
const { errorHandler } = require('../utils/errorHandler');
const { uploadSingleImage, deleteObject } = require('../config/s3.config');
/**
 * LanguageSchema{lang,}
 * TagsSchema{tag}
 * GenreSchema{genre}
 * AlbumSchema{title,artist,songs[]}
 * MusicSchema{title,length,artists[],tags[],lang,genre[]}
 */
module.exports = {
    createAlbum: async (req, res) => {
        errorHandler(req, res, async () => {
            uploadSingleImage(req, res, async (err) => {
                if (err) return res.status(500).json({ error: err });
                const newAlbum = await Album.create({ ...req.body, artist: req.user._id, imageLink: req.file.location });
                return res.status(201).json({ message: 'Success', album: newAlbum });
            });
        });
    },
    addMusicToAlbum: async (req, res) => {
        errorHandler(req, res, async () => {
            const album = await Album.findOne({ _id: req.body.album.id });
            if (album) {
                const music = await Music.findOne({ _id: req.body.album.musicId });
                if (music) {
                    album.songs.push(music._id);
                    await album.save();
                    res.status(201).json({ message: 'success', album });
                } else {
                    res.status(400).json({ message: 'music not found' });
                }
            } else {
                res.status(400).json({ message: 'album not found' });
            }
        });
    },
    removeMusicFromAlbum: async (req, res) => {
        errorHandler(req, res, async () => {
            const album = await Album.findOne({ _id: req.body.album._id });
            if (album) {
                if (await Music.exists({ _id: req.body.musicId })) {
                    const index = album.songs.indexOf(req.body.music._id);
                    if (index > -1) {
                        album.songs.splice(index, 1);
                        await album.save();
                        res.status(201).json({ message: 'success', album });
                    } else {
                        res.status(400).json({ message: 'music not found' });
                    }
                } else {
                    res.status(400).json({ message: 'music not found' });
                }
            } else {
                res.status(400).json({ message: 'album not found' });
            }
        });
    },
    getAlbum: async (req, res) => {
        errorHandler(req, res, async () => {
            const album = await Album.findOne({ _id: req.params.id }).populate('Artist', '-password');
            res.status(200).json({ message: 'success', album });
        });
    },
    getAlbums: async (req, res) => {
        errorHandler(req, res, async () => {
            const albums = await Album.find({ artist: req.user._id }).populate('Artist', '-password');
            res.status(200).json({ message: 'success', albums });
        });
    },
    updateAlbum: async (req, res) => {
        errorHandler(req, res, async () => {
            if (await Album.exists({ _id: req.params.id })) {
                const album = await Album.updateOne({ _id: req.params.id }, { ...req.body });
                res.status(200).json({ message: 'success', album });
            } else {
                res.status(400).json({ message: 'album not found' });
            }
        });
    },
    deleteAlbum: async (req, res) => {
        errorHandler(req, res, async () => {
            if (await Album.exists({ _id: req.params.id })) {
                const album = await Album.findOneAndDelete({ _id: req.params.id });
                deleteObject(album.imageLink);
                res.status(200).json({ message: 'success', album });
            } else {
                res.status(400).json({ message: 'album not found' });
            }
        });
    },
};
