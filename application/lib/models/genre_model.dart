class Genre {
  late String id;
  late String name;

  Genre({required this.id,required this.name});

  factory Genre.fromJson(Map<String, dynamic> json) => Genre(
    id: json["_id"],
    name: json["name"],
  );

  Map<String, dynamic> toJson() => {
    "_id": id,
    "name": name,
  };
}