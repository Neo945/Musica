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
        console.log({...req.body,artist:req.user._id})
        const newAlbum = new Album({...req.body,artist:req.user._id});
        const na = await newAlbum.save();
        res.send(na);
    },
    getAlbum: async (req,res)=>{
        const na = await Album.findOne().populate('user');
        res.send(na);
    },
}