const Album = require('../models/album');
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
};
