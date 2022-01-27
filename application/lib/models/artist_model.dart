
import 'package:application/models/user_model.dart';
import 'package:json_annotation/json_annotation.dart';

import 'language_model.dart';

part 'artist_model.g.dart';

@JsonSerializable(explicitToJson: true)
class Artist {
  late String profileImage;
  late String id;
  late List<Language> language;
  late String phone;
  late int age;
  late User user;

  Artist({
    required this.id,
    required this.profileImage,
    required this.language,
    required this.phone,
    required this.age,
    required this.user,
  });
  
  factory Artist.fromJson(Map<String, dynamic> json) => _$ArtistFromJson(json);

  Map<String, dynamic> toJson() => _$ArtistToJson(this);
}
