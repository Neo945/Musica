import 'package:json_annotation/json_annotation.dart';

part 'tags_model.g.dart';

@JsonSerializable(explicitToJson: true)
class Tag {
  late String id;
  late String tag;

  Tag({required this.id,required this.tag});

  factory Tag.fromJson(Map<String, dynamic> json) => _$TagFromJson(json);

  Map<String, dynamic> toJson() => _$TagToJson(this);

}