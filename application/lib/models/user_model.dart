import 'package:json_annotation/json_annotation.dart';

part 'user_model.g.dart';

@JsonSerializable(explicitToJson: true)
class User {
  late String id;
  late bool isVarified;
  late String username;
  late String email;
  // late String _password;

  User({
    required this.isVarified,
    required this.username,
    required this.email,
  });

  
  factory User.fromJson(Map<String, dynamic> json) => _$UserFromJson(json);

  Map<String, dynamic> toJson() => _$UserToJson(this);
}
