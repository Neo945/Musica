const { Album, Music } = require('../models/music');
const { uploadSingle, s3 } = require('../config/s3.config');

/**
 * LanguageSchema{lang,}
 * TagsSchema{tag}
 * GenreSchema{genre}
 * AlbumSchema{title,artist,songs[]}
 * MusicSchema{title,length,artists[],tags[],lang,genre[]}
*/
module.exports = {
    createAlbum: async (req, res) => {
        const newAlbum = Album.create({ ...req.body, artist: req.user._id });
        res.send(newAlbum);
    },
    getAllUserAlbum: async (req, res) => {
        const albums = await Album.find({ artist: req.user._id }).populate('artist');
        res.send(albums);
    },
    createMusic: (req, res) => {
        uploadSingle(req, res, async (err) => {
            if (err) return res.status(400).json({ message: err.message });
            console.log('req.file', req.file);
            console.log('req.files', req.files);
            // let album = await Album.findOne({ title: req.body.title });
            // if (!album) {
            // album = Album.findOne({ id: req.body.albumId });
            // await Music.create({ ...req.body });
            // }
            return res.status(201).send({ message: 'music successfully saved' });
        });
        // res.status(201).send({ message: 'music successfully saved' });
    },
    getMusic: (req, res) => {
        s3.getObject({
            Bucket: 'musica-music',
            Key: 'auio.mp3',
        }, (er, data) => {
            res.send(data.Body);
        });
    },
};
