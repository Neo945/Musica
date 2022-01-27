import 'package:application/models/language_model.dart';
import 'package:application/models/music_model.dart';
import 'package:json_annotation/json_annotation.dart';

import 'artist_model.dart';
import 'genre_model.dart';

part 'playlist_model.g.dart';

@JsonSerializable(explicitToJson: true)
class Playlist {
  late String id;
  late String title;
  late String imageLink;
  late Artist createdBy;
  late String description;
  late int plays;
  late List<Genre> genre;
  late Language language;
  late List<Music> music;

  Playlist({
    required this.id,
    required this.title,
    required this.imageLink,
    required this.createdBy,
    required this.description,
    required this.plays,
    required this.genre,
    required this.language,
    required this.music,
  });

  factory Playlist.fromJson(Map<String, dynamic> json) => _$PlaylistFromJson(json);

  Map<String, dynamic> toJson() => _$PlaylistToJson(this);
}
