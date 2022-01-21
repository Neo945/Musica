
import 'package:flutter/material.dart';
import 'package:flutter/painting.dart';
import 'package:flutter_font_icons/flutter_font_icons.dart';

class SearchPage extends StatefulWidget {
  const SearchPage({Key? key}) : super(key: key);

  @override
  _SearchPageState createState() => _SearchPageState();
}

class _SearchPageState extends State<SearchPage> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.black,
      body: getBody(),
      appBar: getAppBar(),
    );
  }

  Widget getBody() {
    return Padding(
      padding: const EdgeInsets.only(left: 30, right: 30),
      child: Column(
        children: [
          Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              const Text(
                "Search",
                style: TextStyle(
                  fontSize: 30,
                  fontWeight: FontWeight.bold,
                  color: Colors.white,
                ),
              ),
              Padding(
                padding: const EdgeInsets.only(top: 10, bottom: 10),
                child: TextField(
                  decoration: InputDecoration(
                    hintText: "Artists, songs. or podcasts",
                    hintStyle: const TextStyle(
                      backgroundColor: Colors.transparent,
                      color: Colors.black
                    ),
                    filled: true,
                    fillColor: Colors.white,
                    suffixIcon: const Icon(
                      Feather.mic,
                      color: Colors.black,
                    ),
                    prefixIcon: const Icon(
                      Feather.search,
                      color: Colors.black,
                    ),
                    border: OutlineInputBorder(
                      borderRadius: BorderRadius.circular(15),
                      borderSide: const BorderSide(
                        color: Colors.black,
                      )
                    ),
                    focusedBorder: OutlineInputBorder(
                      borderRadius: BorderRadius.circular(15),
                      borderSide: const BorderSide(
                        color: Colors.black,
                      )
                    ),
                    focusColor: Colors.white,
                  ),
                  style: const TextStyle(
                    color: Colors.black,
                  ),
                ),
              )
            ],
          )
        ],
      ),
    );
  }

  PreferredSizeWidget getAppBar() {
    return AppBar(
      backgroundColor: Colors.black,
      elevation: 0,
    );
  }
}
