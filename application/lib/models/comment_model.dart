import 'package:json_annotation/json_annotation.dart';

part 'comment_model.g.dart';

@JsonSerializable(explicitToJson: true)
class Comment {
  late String id;
  late String comment;
  late int likes;
  late List<Comment> comments;

  Comment(
      {required this.comment,
      required this.likes,
      required this.comments,
      required this.id});

  factory Comment.fromJson(Map<String, dynamic> json) =>
      _$CommentFromJson(json);

  Map<String, dynamic> toJson() => _$CommentToJson(this);
}
