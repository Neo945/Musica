const Music = require('../models/music');
const Language = require('../models/language');
const Tag = require('../models/tags');
const Genre = require('../models/genre');
const Album = require('../models/album');
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
        if (album)
            res.status(403).send({ message: 'Album not found, First create the ablum and them try to add the audio' });
        uploadSingle(req, res, async (err) => {
            if (err) return res.status(400).json({ message: err.message });
            const newAudio = Music.create({ ...req.body });

            return res.status(201).send({ message: 'music successfully saved' });
        });
    },
    getAudio: (req, res) => {
        s3.getObject(
            {
                Bucket: 'musica-music',
                Key: 'auio.mp3',
            },
            (er, data) => {
                if (er) throw new Error(er);
                res.send(data.Body);
            }
        );
    },
    deleteAudio: (req, res) => {
        const musicObj = Music.deleteOne({ id: req.body.id });
        const albumId = musicObj.album;
        const album = Album.findOne({ id: albumId });
        if (album.music.length === 0) Album.deleteOne({ id: album._id });
        s3.deleteObject(
            {
                Bucket: 'musica-music',
                Key: `${req.user.id}/${musicObj.id}.mp3`,
            },
            (err, data) => {
                if (err) throw new Error(err);
                if (err) res.status(400).send({ message: err.message });
                res.send(data);
            }
        );
    },
};
/**
 * await Music.findOneAndUpdate({ id: newAudio._id }, { $push: { album: album._id } });
            const { language } = req.body;
            const { genre } = req.body;
            const { tags } = req.body;
            let uploaded = await Language.insertMany(language);
            Music.findByIdAndUpdate({ _id: newAudio._id }, { $push: { language: { $each: uploaded } } });
            uploaded = await Tag.insertMany(tags);
            Music.findByIdAndUpdate({ _id: newAudio._id }, { $push: { tags: { $each: uploaded } } });
            uploaded = await Genre.insertMany(genre);
            Music.findByIdAndUpdate({ _id: newAudio._id }, { $push: { genre: { $each: uploaded } } });
            return res.status(201).send({ message: 'music successfully saved' });
 */
