import 'package:application/models/comment_model.dart';
import 'package:application/models/music_model.dart';
import 'package:json_annotation/json_annotation.dart';

import 'artist_model.dart';

part 'post_model.g.dart';

@JsonSerializable(explicitToJson: true)
class Post {
  late String id;
  late Artist artist;
  late int likes;
  late bool liked;
  late String description;
  late Music music;
  late List<Comment> comments;

  Post({
    required this.id,
    required this.description,
    required this.artist,
    required this.comments,
    required this.music,
    required this.liked,
    required this.likes,
  });

  factory Post.fromJson(Map<String, dynamic> json) =>
      _$PostFromJson(json);

  Map<String, dynamic> toJson() => _$PostToJson(this);
}
