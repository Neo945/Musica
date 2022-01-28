import 'dart:convert';

import 'package:http/http.dart' as http;
import 'package:shared_preferences/shared_preferences.dart';

class NetworkService {
  late JsonDecoder _decoder;
  late JsonEncoder _encoder;
  late SharedPreferences _prefs;
  late String _url;

  NetworkService({required url}) {
    _url = url;
    _decoder = const JsonDecoder();
    _encoder = const JsonEncoder();
  }

  void initSharedPrefs() async {
    _prefs = await SharedPreferences.getInstance();
    initCookies();
  }

  void initCookies() {
    String cookie = _prefs.getString("cookies")!;
    var cookies = cookie.split(';');
    for (var cookie in cookies) {
      _setCookie(cookie);
    }
  }

  Future<bool> _saveCookie(String cookie) async {
    return await _prefs.setString("cookies", cookie);
  }

  Future<dynamic> getPreferances(String key) async {
    return await _decoder.convert(_prefs.getString(key)!);
  }

  Future<bool> savePreferance(String key, Map<String, dynamic> value) async {
    return await _prefs.setString(key, _encoder.convert(value));
  }

  Map<String, String> headers = {
    "content-type": "application/json",
    "Accept": "application/json"
  };
  Map<String, String> cookies = {};

  void _updateCookie(http.Response response) {
    String? allSetCookie = response.headers['set-cookie'];

    if (allSetCookie != null) {
      var setCookies = allSetCookie.split(',');

      for (var setCookie in setCookies) {
        var cookies = setCookie.split(';');

        for (var cookie in cookies) {
          _setCookie(cookie);
        }
      }

      headers['cookie'] = _generateCookieHeader();
      _saveCookie(headers['cookie']!);
    }
  }

  void _setCookie(String rawCookie) {
    if (rawCookie.isNotEmpty) {
      var keyValue = rawCookie.split('=');
      if (keyValue.length == 2) {
        var key = keyValue[0].trim();
        var value = keyValue[1];

        // ignore keys that aren't cookies
        if (key == 'path' || key == 'expires') return;

        cookies[key] = value;
      }
    }
  }

  String _generateCookieHeader() {
    String cookie = "";
    for (var key in cookies.keys) {
      if (cookie.isNotEmpty) cookie += ";";
      cookie += key + "=" + cookies[key]!;
    }
    return cookie;
  }

  Future<dynamic> get(String url) {
    Uri uri = Uri.parse("$_url$url");
    return http.get(uri, headers: headers).then((http.Response response) {
      final String res = response.body;
      final int statusCode = response.statusCode;

      _updateCookie(response);

      if (statusCode < 200 || statusCode > 400) {
        throw Exception("Error while fetching data");
      }
      return _decoder.convert(res);
    });
  }

  Future<dynamic> post(String url, {required body, encoding}) async {
    encoding ??= Encoding.getByName("utf-8");
    Uri uri = Uri.parse("$_url$url");
    return http
        .post(uri,
            body: _encoder.convert(body), headers: headers, encoding: encoding)
        .then((http.Response response) {
      final String res = response.body;
      final int statusCode = response.statusCode;

      _updateCookie(response);

      if (statusCode < 200 || statusCode > 400) {
        throw Exception("Error while fetching data");
      }
      return _decoder.convert(res);
    });
  }
}
