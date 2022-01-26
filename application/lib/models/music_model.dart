import 'package:application/models/genre_model.dart';
import 'package:application/models/language_model.dart';
import 'package:application/models/user_model.dart';

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
  late List<Genre> tag;
  late int likes;
  late int plays;
  late List<Artist> collab;
  late bool liked;

  Music(
      {required this.id,
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
      required this.artist});

  factory Music.fromJson(Map<String, dynamic> json) => Music(
        id: json["id"],
        likes: json["likes"],
        title: json["title"],
        link: json["link"],
        liked: json["liked"],
        plays: json["plays"],
        linkAWS: json["linkAWS"],
        length: json["length"].toDouble(),
        language: List<Language>.from(
            json["language"].map((x) => Language.fromJson(x))),
        genre: List<Genre>.from(json["genre"].map((x) => Genre.fromJson(x))),
        tag: List<Genre>.from(json["tag"].map((x) => Genre.fromJson(x))),
        lyrics: '${json["lyrics"]}',
        artist: Artist.fromJson(json["artist"]),
        collab:
            List<Artist>.from(json["collab"].map((x) => Artist.fromJson(x))),
      );

  Map<String, dynamic> toJson() => {
        "id": id,
        "title": title,
        "likes": likes,
        "plays": plays,
        "link": link,
        "liked": liked,
        "linkAWS": linkAWS,
        "length": length,
        "lyrics": lyrics,
        "artist": artist.toJson(),
        "genre": List<dynamic>.from(genre.map((x) => x.toJson())),
        "tag": List<dynamic>.from(tag.map((x) => x.toJson())),
        "language": List<dynamic>.from(language.map((x) => x.toJson())),
        "collab": List<dynamic>.from(collab.map((x) => x.toJson())),
      };
}
