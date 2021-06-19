const { Album } = require("./models")

/**
 * LanguageSchema{lang,}
 * TagsSchema{tag}
 * GenreSchema{genre}
 * AlbumSchema{title,artist,songs[]}
 * MusicSchema{title,length,artists[],tags[],lang,genre[]}
*/ 
module.exports = {
    addAlbum:async (req,res)=>{
        const newAlbum = Album.create({...req.body,artist:req.user._id});
        res.send(newAlbum);
    },
    getAlbum: async (req,res)=>{
        const na = await Album.findOne().populate('artist');
        res.send(na);
    },
}