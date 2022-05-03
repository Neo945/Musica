import 'dart:math';

import 'package:application/json/sample_data.dart';
import 'package:flutter/material.dart';
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
      // appBar: getAppBar(),
    );
  }

  Widget getAlbumBox() {
    return Row(
      children: List.generate(
        2,
        (index) => Expanded(
          flex: 5,
          child: Padding(
            padding: const EdgeInsets.all(5),
            child: Container(
              clipBehavior: Clip.hardEdge,
              height: 100,
              decoration: BoxDecoration(
                borderRadius: BorderRadius.circular(10),
                // gradient: const LinearGradient(
                //   colors: [],
                //   begin: Alignment.bottomCenter,
                //   end: Alignment.topCenter,
                // ),
                color: const Color(0xFF86B7AE),
              ),
              child: Stack(
                children: [
                  Transform.translate(
                    offset: const Offset(100, 30),
                    child: Transform.rotate(
                      angle: 2 * pi / 14.4,
                      child: Container(
                        width: 80,
                        height: 80,
                        decoration: BoxDecoration(
                            image: DecorationImage(
                                image: AssetImage(songs[index]['img']))),
                      ),
                    ),
                  ),
                  const Padding(
                    padding: EdgeInsets.all(10),
                    child: Text(
                      "Title",
                      style: TextStyle(
                          color: Colors.white,
                          fontSize: 20,
                          fontWeight: FontWeight.bold),
                    ),
                  ),
                ],
              ),
            ),
          ),
        ),
      ),
    );
  }

  Widget getBody() {
    return SingleChildScrollView(
      child: Padding(
        padding: const EdgeInsets.only(left: 30, right: 30, top: 60),
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
                    cursorColor: Colors.black,
                    decoration: InputDecoration(
                      contentPadding: const EdgeInsets.all(5),
                      hintText: "Artists, songs. or podcasts",
                      hintStyle: const TextStyle(
                          backgroundColor: Colors.transparent,
                          color: Colors.black),
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
                          borderRadius: BorderRadius.circular(13),
                          borderSide: const BorderSide(
                            color: Colors.black,
                          )),
                      focusedBorder: OutlineInputBorder(
                          borderRadius: BorderRadius.circular(13),
                          borderSide: const BorderSide(
                            color: Colors.black,
                          )),
                      focusColor: Colors.white,
                    ),
                    style: const TextStyle(
                      color: Colors.black,
                    ),
                  ),
                ),
              ],
            ),
            // Genre group in two
            Padding(
              padding: const EdgeInsets.only(top: 10),
              child: Column(
                  children: List.generate(3, (index) {
                return Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    const Text(
                      "Your top genres",
                      style: TextStyle(
                        color: Colors.white,
                        fontWeight: FontWeight.bold,
                        fontSize: 20,
                      ),
                    ),
                    Padding(
                      padding: const EdgeInsets.only(top: 20, bottom: 20),
                      child: getAlbumBox(),
                    )
                  ],
                );
              })),
            ),
            // Browse all
            Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                const Text(
                  "Browse All",
                  style: TextStyle(
                    color: Colors.white,
                    fontWeight: FontWeight.bold,
                    fontSize: 20,
                  ),
                ),
                Padding(
                  padding: const EdgeInsets.only(top: 10, bottom: 10),
                  child: Column(
                      children: List.generate(4, (index) => getAlbumBox())),
                )
              ],
            ),
            const SizedBox(
              height: 130,
            ),
          ],
        ),
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
