import 'package:application/models/language_model.dart';

class User {
  late String id;
  late bool isVarified;
  late String username;
  late String email;
  // late String _password;

  User({
    required this.id,
    required this.isVarified,
    required this.username,
    required this.email,
  });

  User.fromJson(Map<String, dynamic> json) {
    id = json['_id'];
    isVarified = json['isVarified'];
    username = json['username'];
    if (
      RegExp(
          r"^[a-zA-Z0-9.a-zA-Z0-9.!#$%&'*+-/=?^_`{|}~]+@[a-zA-Z0-9]+\.[a-zA-Z]+"
        )
        .hasMatch(json['email'])) {
      email = json['email'];
    }
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = <String, dynamic>{};
    data['_id'] = id;
    data['isVarified'] = isVarified;
    data['username'] = username;
    data['email'] = email;
    return data;
  }

  @override
  String toString() {
    return 'User{username: $username, email: $email}';
  }
}

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

  Artist.fromJson(Map<String, dynamic> json) {
    id = json['_id'];
    profileImage = json['profileImage'];
    language = (json['language'] != null
        ? (json['language'] as List).map((e) => Language.fromJson(e)).toList()
        : null)!;
    phone = json['phone'];
    age = json['age'];
    user = (json['user'] != null ? User.fromJson(json['user']) : null)!;
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = <String, dynamic>{};
    data['_id'] = id;
    data['profileImage'] = profileImage;
    data['language'] = language.map((e) => e.toJson()).toList();
    data['phone'] = phone;
    data['age'] = age;
    data['user'] = user;
    return data;
  }
}
