class Language {
  late String language;
  late String id;

  Language({required this.language,required this.id});

  Language.fromJson(Map<String, dynamic> json) {
    language = json['language'];
    id = json['_id'];
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = <String, dynamic>{};
    data['language'] = language;
    data['_id'] = id;
    return data;
  }
}