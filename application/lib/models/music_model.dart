import 'package:application/models/genre_model.dart';
import 'package:application/models/language_model.dart';
import 'package:application/models/tags_model.dart';
// import 'package:application/models/user_model.dart';
import 'package:json_annotation/json_annotation.dart';

import 'artist_model.dart';

part 'music_model.g.dart';

@JsonSerializable(explicitToJson: true)
class Music {
  late String id;
  late String title;
  late String link;
  late String linkAWS;
  late double length;
  late String lyrics;
  late Artist artist;
  late List<Language> language;
  late List<Genre> genre;
  late List<Tag> tag;
  late int likes;
  late int plays;
  late List<Artist> collab;
  late bool liked;

  Music({
    required this.id,
    required this.title,
    required this.likes,
    required this.liked,
    required this.plays,
    required this.link,
    required this.linkAWS,
    required this.language,
    required this.genre,
    required this.tag,
    required this.collab,
    required this.length,
    required this.lyrics,
    required this.artist,
  });

  factory Music.fromJson(Map<String, dynamic> json) => _$MusicFromJson(json);

  Map<String, dynamic> toJson() => _$MusicToJson(this);
}
