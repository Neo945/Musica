const Playlist = require('../models/playlist');
const { errorHandler } = require('../utils/errorHandler');
const { uploadSingle } = require('../config/s3.config');

module.exports = {
    getPlaylistMusics: async (req, res) => {
        errorHandler(req, res, async () => {
            const { playlist } = req.body;
            const playlistMusics = await Playlist.find({ _id: playlist._id }).populate('musics', '-_link -linkAWS');
            if (playlistMusics.music.length > 0) res.status(404).send({ message: 'Empty playlist' });
            res.send({ music: playlistMusics.music });
        });
    },
    getPlaylist: async (req, res) => {
        errorHandler(req, res, async () => {
            const { _id } = req.body;
            const playlist = await Playlist.findOne({ _id, user: req.user._id });
            if (!playlist) res.status(404).send({ message: 'Playlist not found' });
            res.send({ playlist });
        });
    },
    getPlaylists: async (req, res) => {
        errorHandler(req, res, async () => {
            const playlists = await Playlist.find({ user: req.user._id });
            if (playlists.length > 0) res.status(404).send({ message: 'Playlists not found' });
            res.send(playlists);
        });
    },
    getPlaylistsCreatedByUser: async (req, res) => {
        errorHandler(req, res, async () => {
            const { user } = req.body;
            const playlists = await Playlist.find({ createdBy: user._id });
            if (playlists.length > 0) res.status(404).send({ message: 'Playlists not found' });
            res.send({ playlists });
        });
    },
    searchPlaylists: async (req, res) => {
        errorHandler(req, res, async () => {
            const { title } = req.body;
            const playlists = await Playlist.find({
                $or: [{ title: { $regex: title, $options: 'i' } }, { description: { $regex: title, $options: 'i' } }],
            });
            if (playlists.length > 0) res.status(404).send({ message: 'Playlists not found' });
            res.send(playlists);
        });
    },
    createPlaylist: async (req, res) => {
        errorHandler(req, res, async () => {
            uploadSingle(req, res, async (err) => {
                if (err) res.status(500).json({ error: err });
                const { title, description } = req.body;
                const playlist = await Playlist.create({
                    title,
                    description,
                    imageLink: req.file.location,
                    createdBy: req.user._id,
                });
                res.send({ playlist });
            });
        });
    },
    updatePlaylist: async (req, res) => {
        errorHandler(req, res, async () => {
            const { _id, title, description } = req.body;
            const playlist = await Playlist.findOneAndUpdate({ _id, user: req.user._id }, { title, description });
            if (!playlist) res.status(404).send({ message: 'Playlist not found' });
            res.send(playlist);
        });
    },
    deletePlaylist: async (req, res) => {
        errorHandler(req, res, async () => {
            const { _id } = req.body;
            const playlist = await Playlist.findOneAndDelete({ _id, user: req.user._id });
            if (!playlist) res.status(404).send({ message: 'Playlist not found' });
            res.send(playlist);
        });
    },
    addMusicToPlaylist: async (req, res) => {
        errorHandler(req, res, async () => {
            const { music, playlist } = req.body;
            const playlistMusic = await Playlist.findOne({ _id: playlist._id, user: req.user._id });
            if (!playlistMusic) res.status(404).send({ message: 'Playlist not found' });
            playlistMusic.songs.push(music._id);
            music.tags.forEach((tag) => {
                if (playlistMusic.tags.indexOf(tag._id) === -1) playlistMusic.tags.push(tag._id);
            });
            music.genres.forEach((g) => {
                if (playlistMusic.genres.indexOf(g._id) === -1) playlistMusic.genres.push(g._id);
            });
            music.language.forEach((l) => {
                if (playlistMusic.lang.indexOf(l._id) === -1) playlistMusic.lang.push(l._id);
            });
            music.collab.forEach((collab) => {
                if (playlistMusic.collab.indexOf(collab._id) === -1) playlistMusic.artists.push(collab._id);
            });
            await playlistMusic.save();
            res.send(playlistMusic);
        });
    },
    removeMusicToPlaylist: async (req, res) => {
        errorHandler(req, res, async () => {
            const { music, playlist } = req.body;
            const playlistMusic = await Playlist.findOneAndUpdate(
                { _id: playlist._id, user: req.user._id },
                { $pull: { musics: music._id } },
                { new: true }
            );
            if (!playlistMusic) res.status(404).send({ message: 'Playlist not found' });
            res.send(playlistMusic);
        });
    },
    listenPlaylist: async (req, res) => {
        errorHandler(req, res, async () => {
            const { playlist } = req.body;
            const playlistMusic = await Playlist.findOneAndUpdate({ _id: playlist._id }, { $push: { plays: req.user._id } });
            if (!playlistMusic) res.status(404).send({ message: 'Playlist not found' });
            res.send(playlistMusic);
        });
    },
};
