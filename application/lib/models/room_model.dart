// import 'package:application/models/comment_model.dart';
import 'package:application/models/message_model.dart';
// import 'package:application/models/music_model.dart';
import 'package:json_annotation/json_annotation.dart';

import 'artist_model.dart';

part 'room_model.g.dart';

@JsonSerializable(explicitToJson: true)
class Room {
  late String id;
  late List<Artist> artists;
  late List<Message> messages;

  Room({
    required this.id,
    required this.artists,
    required this.messages,
  });

  factory Room.fromJson(Map<String, dynamic> json) => _$RoomFromJson(json);

  Map<String, dynamic> toJson() => _$RoomToJson(this);
}
