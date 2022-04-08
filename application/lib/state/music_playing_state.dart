import 'package:application/models/genre_model.dart';
import 'package:application/models/language_model.dart';
import 'package:application/models/music_model.dart';
import 'package:application/models/tags_model.dart';
import 'package:application/models/user_model.dart';
import 'package:flutter/foundation.dart';

class MusicPlayingState with ChangeNotifier {
  // Music? music = Music(id: '12', title: 'title', likes: 5, liked: true, plays: 5, link: '/', linkAWS: '/', language: [Language(language: 'end', id: '1')], genre: [Genre(id: '4', name: 'rock')], tag: [Tag(id: '1', tag: 'tag')], collab: [], length: 4, lyrics: 'lyrics');
  Music? music;
  bool isPlaying = false;

  void play(Music? music, isPlaying){
    this.music = music;
    this.isPlaying = isPlaying;
    notifyListeners();
  }
}

