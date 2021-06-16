const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const LanguageSchema = new Schema({
    lang:{
        type: String,
        required: [true,'Cannot be empty'],
        trim: true,
        unique: true,
        minLength: 5
    },
});
const TagsSchema = new Schema({
    tag:{
        type: String,
        required: [true,'Cannot be empty'],
        trim: true,
        unique: true,
        minLength: 5
    },
});
const GenreSchema = new Schema({
    genre:{
        type: String,
        required: [true,'Cannot be empty'],
        trim: true,
        unique: true,
        minLength: 5
    },
});

const AlbumSchema = new Schema({
    title:{
        type: String,
        required: [true,'Cannot be empty'],
        trim: true,
        unique: true,
        minLength: 5
    },
    artist:{
        type: Schema.Types.ObjectId, ref: 'artist' 
    },
    music:[{
        type: Schema.Types.ObjectId, ref: 'music'
    }],
},{
    timestamps:true
})

const MusicSchema = new Schema({
    title:{
        type: String,
        required: [true,'Cannot be empty'],
        trim: true,
        unique: true,
        minLength: 5
    },
    length:{
        type: Number,
        required: [true],
        validate: {
            validator: function(v) {return v>0},
            message: props => `${props.value} Length cannot be 0 ${props}`
          },
        min: 0
    },
    artist:[{type: Schema.Types.ObjectId, ref: 'artist'}],
    tag:[{type: Schema.Types.ObjectId, ref: 'tags'}],
    language:{type: Schema.Types.ObjectId, ref: 'language'},
    genre:[{type: Schema.Types.ObjectId, ref: 'genre'}],
},{
    timestamps:true,
});
const Music = mongoose.model('music',MusicSchema);
const Language = mongoose.model('language',LanguageSchema);
const Tag = mongoose.model('tags',TagsSchema);
const Genre = mongoose.model('genre',GenreSchema);
const Album = mongoose.model('album',AlbumSchema);
module.exports = {
    Music,
    Language,
    Tag,
    Genre,
    Album
};