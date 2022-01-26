import 'package:application/models/music_model.dart';
import 'package:flutter/foundation.dart';

class MusicPlayingState with ChangeNotifier {
  Music? music;
  bool isPlaying = false;
  
  void play(Music music, isPlaying){
    this.music = music;
    this.isPlaying = isPlaying;
    notifyListeners();
  }
}

class TabState with ChangeNotifier {
  int tab = 0;

  void setTab(int tab) {
    this.tab = tab;
    notifyListeners();
  }
}
