import 'package:application/models/artist_model.dart';
import 'package:json_annotation/json_annotation.dart';

part 'message_model.g.dart';

@JsonSerializable(explicitToJson: true)
class Message {
  late Artist user;
  late String text;
  late String id;
  late String objectUrl;
  late String type;

  Message({
    required this.user,
    required this.text,
    required this.objectUrl,
    required this.id,
    required this.type,
  });

  factory Message.fromJson(Map<String, dynamic> json) =>
      _$MessageFromJson(json);

  Map<String, dynamic> toJson() => _$MessageToJson(this);
}
