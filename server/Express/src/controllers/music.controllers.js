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
        const album = Album.findOne({ id: req.body.albumId });
        if (album) res.status(403).send({ message: 'Album not found, FIrst create the ablum and them try to add the audio' });
        uploadSingle(req, res, async (err) => {
            if (err) return res.status(400).json({ message: err.message });
            const newAudio = Music.create({ ...req.body });
            Music.findOneAndUpdate({ id: newAudio._id }, { $push: { album: album._id } });
            const { language } = req.body;
            const { genre } = req.body;
            return res.status(201).send({ message: 'music successfully saved' });
        });
    },
    getAudio: (req, res) => {
        s3.getObject({
            Bucket: 'musica-music',
            Key: 'auio.mp3',
        }, (er, data) => {
            if (er) throw new Error(er);
            res.send(data.Body);
        });
    },
    deleteAudio: (req, res) => {
        const musicObj = Music.deleteOne({ id: req.body.id });
        const albumId = musicObj.album;
        const album = Album.findOne({ id: albumId });
        if (album.music.length === 0) Album.deleteOne({ id: album._id });
        s3.deleteObject({
            Bucket: 'musica-music',
            Key: `${req.user.id}/${musicObj.id}.mp3`,
        }, (err, data) => {
            if (err) throw new Error(err);
            if (err) res.status(400).send({ message: err.message });
            res.send(data);
        });
    },
};
