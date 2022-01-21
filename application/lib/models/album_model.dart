import 'package:application/models/genre_model.dart';
import 'package:application/models/language_model.dart';
import 'package:application/models/music_model.dart';
import 'package:application/models/user_model.dart';

class Album {
  late String title;
  late String imageLink;
  late String id;
  late Artist artist;
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

  factory Album.fromJson(Map<String, dynamic> json) {
    return Album(
      title: json['title'],
      imageLink: json['imageLink'],
      id: json['id'],
      artist: Artist.fromJson(json['artist']),
      musics: (json['musics'] as List)
          .map((musicJson) => Music.fromJson(musicJson))
          .toList(),
      albums: (json['albums'] as List)
          .map((albumJson) => Album.fromJson(albumJson))
          .toList(),
      languages: (json['languages'] as List)
          .map((languageJson) => Language.fromJson(languageJson))
          .toList(),
      genres: (json['genres'] as List)
          .map((genreJson) => Genre.fromJson(genreJson))
          .toList(),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'title': title,
      'imageLink': imageLink,
      'id': id,
      'artist': artist.toJson(),
      'musics': musics.map((music) => music.toJson()).toList(),
      'albums': albums.map((album) => album.toJson()).toList(),
      'languages': languages.map((language) => language.toJson()).toList(),
      'genres': genres.map((genre) => genre.toJson()).toList(),
    };
  }
}
