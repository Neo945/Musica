import 'package:json_annotation/json_annotation.dart';

part 'language_model.g.dart';

@JsonSerializable(explicitToJson: true)
class Language {
  late String name;
  late String code;
  late String id;

  Language({required this.name, required this.code, required this.id});

  factory Language.fromJson(Map<String, dynamic> json) => _$LanguageFromJson(json);

  Map<String, dynamic> toJson() => _$LanguageToJson(this);
}