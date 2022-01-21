class Tag {
  late String id;
  late String tag;

  Tag({required this.id,required this.tag});

  factory Tag.fromJson(Map<String, dynamic> json) => Tag(
    id: json["_id"],
    tag: json["tag"],
  );

  Map<String, dynamic> toJson() => {
    "_id": id,
    "tag": tag,
  };
}