import 'package:application/models/genre_model.dart';
import 'package:application/models/language_model.dart';
import 'package:application/models/music_model.dart';
import 'package:json_annotation/json_annotation.dart';

import 'artist_model.dart';

part 'album_model.g.dart';

@JsonSerializable(explicitToJson: true)
class Album {
  late String title;
  late String imageLink;
  late String id;
  late Artist artist;
  late List<Artist> artists;
  late List<Music> musics;
  late List<Album> albums;
  late List<Language> languages;
  late List<Genre> genres;

  Album({
    required this.title,
    required this.imageLink,
    required this.id,
    required this.artist,
    required this.musics,
    required this.albums,
    required this.languages,
    required this.genres,
  });

  factory Album.fromJson(Map<String, dynamic> json) => _$AlbumFromJson(json);

  Map<String, dynamic> toJson() => _$AlbumToJson(this);
}
