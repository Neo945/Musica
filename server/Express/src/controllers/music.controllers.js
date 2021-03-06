const Music = require('../models/music');
const Album = require('../models/album');
const Tag = require('../models/tags');
const Genre = require('../models/genre');
const Language = require('../models/language');
const { Artist } = require('../models/user');
const { uploadSingle } = require('../config/s3.config');
const { s3 } = require('../config/s3.config');
const { errorHandler } = require('../utils/errorHandler');
const Playlist = require('../models/playlist');

/**
 * LanguageSchema{lang,}
 * TagsSchema{tag}
 * GenreSchema{genre}
 * AlbumSchema{title,artist,songs[]}
 * MusicSchema{title,length,artists[],tags[],lang,genre[]}
 */
module.exports = {
    getMusic: async (req, res) => {
        errorHandler(req, res, async () => {
            const { _id } = req.body;
            const music = await Music.findOne({ _id, artist: req.user._id });
            if (!music) res.status(404).send({ message: 'Music not found' });
            res.send({ ...music, likes: music.likes.length, liked: music.likes.includes(req.user._id) });
        });
    },
    getCurrentArtistMusics: async (req, res) => {
        errorHandler(req, res, async () => {
            const musics = await Music.find({ artist: req.user._id });
            if (!musics) res.status(404).send({ message: 'Musics not found' });
            res.send(
                musics.map((music) => ({ ...music, likes: music.likes.length, liked: music.likes.includes(req.user._id) }))
            );
        });
    },
    getMusicByArtist: async (req, res) => {
        errorHandler(req, res, async () => {
            const { artist } = req.body;
            const musics = await Music.find({ $or: [{ artist: artist._id }, { collab: artist._id }] });
            if (!musics) res.status(404).send({ message: 'Musics not found' });
            res.send(
                musics.map((music) => ({ ...music, likes: music.likes.length, liked: music.likes.includes(req.user._id) }))
            );
        });
    },
    getAlbumMusics: async (req, res) => {
        errorHandler(req, res, async () => {
            const { album } = req.body;
            const musics = await Music.find({ album: album._id });
            if (!musics) res.status(404).send({ message: 'Musics not found' });
            res.send(
                musics.map((music) => ({ ...music, likes: music.likes.length, liked: music.likes.includes(req.user._id) }))
            );
        });
    },
    getMusicByTitle: async (req, res) => {
        errorHandler(req, res, async () => {
            const { title } = req.body;
            const music = await Music.find({ title: { $regex: title, $options: 'i' } });
            if (!music) res.status(404).send({ message: 'Music not found' });
            res.send(music.map((m) => ({ ...m, likes: m.likes.length, liked: m.likes.includes(req.user._id) })));
        });
    },
    getMusicsByTagIds: async (req, res) => {
        errorHandler(req, res, async () => {
            const { tags } = req.body;
            const musics = await Music.find({ tags: { $in: tags } });
            if (!musics) res.status(404).send({ message: 'Musics not found' });
            res.send(
                musics.map((music) => ({ ...music, likes: music.likes.length, liked: music.likes.includes(req.user._id) }))
            );
        });
    },
    getMusicsByGenreIds: async (req, res) => {
        errorHandler(req, res, async () => {
            const { genres } = req.body;
            const musics = await Music.find({ genres: { $in: genres } });
            if (!musics) res.status(404).send({ message: 'Musics not found' });
            res.send(
                musics.map((music) => ({ ...music, likes: music.likes.length, liked: music.likes.includes(req.user._id) }))
            );
        });
    },
    getMusicsByLanguageIds: async (req, res) => {
        errorHandler(req, res, async () => {
            const { languages } = req.body;
            const musics = await Music.find({ language: { $in: languages } });
            if (!musics) res.status(404).send({ message: 'Musics not found' });
            res.send(
                musics.map((music) => ({ ...music, likes: music.likes.length, liked: music.likes.includes(req.user._id) }))
            );
        });
    },
    getMusicsBySearchString: async (req, res) => {
        errorHandler(req, res, async () => {
            const { searchString } = req.body;
            const tags = await Tag.find({ tag: { $regex: searchString, $options: 'i' } }).limit(5);
            const genres = await Genre.find({ genre: { $regex: searchString, $options: 'i' } }).limit(5);
            const languages = await Language.find({ name: { $regex: searchString, $options: 'i' } }).limit(5);
            const artist = await Artist.find({ name: { $regex: searchString, $options: 'i' } }).limit(5);
            const playlist = await Playlist.find({
                $or: [
                    { title: { $regex: searchString, $options: 'i' } },
                    { description: { $regex: searchString, $options: 'i' } },
                ],
            }).limit(5);
            const musics = await Music.find({
                $or: [
                    { title: { $regex: searchString, $options: 'i' } },
                    { lyrics: { $regex: searchString, $options: 'i' } },
                    { artist: { $in: artist.map((e) => e._id) } },
                    { tags: { $in: tags.map((e) => e._id) } },
                    { genres: { $in: genres.map((e) => e._id) } },
                    { language: { $in: languages.map((e) => e._id) } },
                    { collab: { $in: artist.map((e) => e._id) } },
                ],
            }).limit(10);
            res.send([
                musics.map((music) => ({ ...music, likes: music.likes.length, liked: music.likes.includes(req.user._id) })),
                tags,
                genres,
                languages,
                artist,
                playlist,
            ]);
        });
    },
    createMusic: async (req, res) => {
        errorHandler(req, res, async () => {
            const { title, length, artists, tags, album, lang, genre } = req.body;
            if (!title || !length || !artists || !tags || !lang || !genre || !album)
                res.status(400).send({ message: 'Please fill all fields' });
            else {
                uploadSingle(req, res, async (err) => {
                    if (err) {
                        res.status(400).send({ message: 'Upload failed' });
                    } else {
                        const music = new Music({
                            title,
                            length,
                            linkAWS: req.file.location,
                            collab: artists,
                            lang: lang.map((e) => e._id),
                            genre: genre.map((e) => e._id),
                            artist: req.user._id,
                        });
                        await music.save();
                        await Tag.saveTags(music, tags);
                        music.link = `/music/audio/${music._id}`;
                        await music.save();
                        // await Album.findOneAndUpdate({ _id: album }, { $push: { music: music._id } });
                        const albumObj = await Album.findOne({ _id: album._id });
                        music.tags.forEach((tag) => {
                            if (albumObj.tags.indexOf(tag._id) === -1) albumObj.tags.push(tag._id);
                        });
                        music.genres.forEach((g) => {
                            if (albumObj.genres.indexOf(g._id) === -1) albumObj.genres.push(g._id);
                        });
                        music.language.forEach((l) => {
                            if (albumObj.lang.indexOf(l._id) === -1) albumObj.lang.push(l._id);
                        });
                        music.collab.forEach((collab) => {
                            if (albumObj.collab.indexOf(collab._id) === -1) albumObj.artists.push(collab._id);
                        });
                        albumObj.music.push(music._id);
                        await albumObj.save();
                        res.send(music);
                    }
                });
            }
        });
    },
    deleteMusic: async (req, res) => {
        errorHandler(req, res, async () => {
            const musicObj = Music.deleteOne({ id: req.body.id });
            await Album.updateMany({ musics: musicObj._id }, { $pull: { music: musicObj._id } });
            s3.deleteObject(
                {
                    Bucket: 'musica-music',
                    Key: `${req.user.id}/${musicObj._id}.mp3`,
                },
                (err, data) => {
                    if (err) throw new Error(err);
                    if (err) res.status(400).send({ message: err.message });
                    res.send(data);
                }
            );
        });
    },
    updateMusic: async (req, res) => {
        errorHandler(req, res, async () => {
            const { _id, title, length, lyrics } = req.body;
            // const { _id, title, length, tags, lyrics, album, lang, genre } = req.body;
            // if (!title || !length || !tags || !lang || !lyrics || !genre || !album)
            //     res.status(400).send({ message: 'Please fill all fields' });
            if (!title || !length || !lyrics) res.status(400).send({ message: 'Please fill all fields' });
            else {
                const music = await Music.findById(_id);
                if (!music) res.status(404).send({ message: 'Music not found' });
                else {
                    music.title = title;
                    music.length = length;
                    music.lyrics = lyrics;
                    await music.save();
                    res.send(music);
                }
            }
        });
    },
    likeMusic: async (req, res) => {
        errorHandler(req, res, async () => {
            const { musicId } = req.body;
            const music = await Music.findById(musicId);
            if (!music) res.status(404).send({ message: 'Music not found' });
            else if (!req.user) res.status(404).send({ message: 'User not found' });
            else if (music.likes.includes(req.user._id)) {
                music.likes = music.likes.filter((e) => e !== req.user._id);
                await music.save();
                res.send(music);
            } else {
                music.likes.push(req.user._id);
                await music.save();
                res.send(music);
            }
        });
    },
    listenMusic: async (req, res) => {
        errorHandler(req, res, async () => {
            const { musicId } = req.body;
            const music = await Music.findById(musicId);
            if (!music) res.status(404).send({ message: 'Music not found' });
            else {
                music.plays.push(req.user._id);
                await music.save();
                s3.getObject({
                    Bucket: 'sample-bucket-musica',
                    Key: `${req.user.id}/${music._id}.mp3`,
                })
                    .createReadStream()
                    .pipe(res);
            }
        });
    },
};
