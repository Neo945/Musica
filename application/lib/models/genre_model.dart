import 'package:json_annotation/json_annotation.dart';

part 'genre_model.g.dart';

@JsonSerializable(explicitToJson: true)
class Genre {
  late String id;
  late String genre;

  Genre({required this.id, required this.genre});

  factory Genre.fromJson(Map<String, dynamic> json) => _$GenreFromJson(json);

  /// Connect the generated [_$PersonToJson] function to the `toJson` method.
  Map<String, dynamic> toJson() => _$GenreToJson(this);
}
