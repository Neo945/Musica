import 'dart:convert';

import 'package:http/http.dart' as http;

const headers = <String, String>{
  'Content-Type': 'application/json',
  'Accept': 'application/json',
};

Future<dynamic> getRequest(String url) async {
  var uri = Uri.parse(url);
  http.Response response = await http.get(uri, headers: headers);
  return await json.decode(response.body);
}

Future<dynamic> postRequest(String url, dynamic body) async {
  var uri = Uri.parse(url);
  http.Response response = await http.post(uri,
      headers: headers, body: json.encode(body));
  return await json.decode(response.body);
}
