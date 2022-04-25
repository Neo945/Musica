import 'package:application/json/sample_data.dart';
import 'package:flutter/material.dart';
import 'package:flutter_font_icons/flutter_font_icons.dart';

class LibraryPage extends StatefulWidget {
  const LibraryPage({Key? key}) : super(key: key);

  @override
  State<LibraryPage> createState() => _LibraryPageState();
}

class _LibraryPageState extends State<LibraryPage> {
  int _tab = 0;
  int _tab2 = 0;

  Widget _getTypeTab(type, index) {
    return GestureDetector(
      child: Padding(
        padding: const EdgeInsets.only(right: 25, bottom: 10),
        child: Text(
          type,
          style: TextStyle(
            fontSize: 30,
            color: _tab == index ? Colors.white : Colors.grey,
            fontWeight: FontWeight.bold,
          ),
        ),
      ),
      onTap: () {
        setState(() {
          _tab = index;
        });
      },
    );
  }

  Widget _getMusicTypeTab(type, index) {
    return GestureDetector(
      child: Padding(
        padding: const EdgeInsets.only(right: 30, bottom: 15, top: 20),
        child: Text(
          type,
          style: TextStyle(
            shadows: [
              Shadow(
                color: _tab2 == index ? Colors.white : Colors.grey,
                offset: const Offset(0, -15),
              ),
            ],
            decoration: TextDecoration.underline,
            color: Colors.transparent,
            decorationThickness: 2,
            decorationColor: _tab2 == index ? primary : Colors.transparent,
            decorationStyle: TextDecorationStyle.solid,
            fontSize: 20,
            fontWeight: FontWeight.bold,
          ),
        ),
      ),
      onTap: () {
        setState(() {
          _tab2 = index;
        });
      },
    );
  }

  Widget _getAlbum() {
    return Padding(
      padding: const EdgeInsets.only(top: 8, bottom: 8),
      child: Row(
        children: [
          Image.asset(
            "assets/images/img_3.jpg",
            height: 64,
            width: 64,
          ),
          Padding(
            padding: const EdgeInsets.all(12),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  "Artist Name",
                  style: TextStyle(
                    fontSize: 14,
                    fontWeight: FontWeight.bold,
                  ),
                ),
                Text(
                  "Artist Name",
                  style: TextStyle(
                    fontSize: 11,
                  ),
                ),
              ],
            ),
          )
        ],
      ),
    );
  }

  final List<String> _typeTab = ["Music", "Playlists"];
  final List<String> _typeMusicTab = ["Playlists", "Artists", "Albums"];

  @override
  Widget build(BuildContext context) {
    return SingleChildScrollView(
      child: Padding(
        padding: const EdgeInsets.only(left: 30, right: 30, top: 60),
        child: Column(
          children: [
            Row(
              children: List.generate(_typeTab.length,
                  (index) => _getTypeTab(_typeTab[index], index)),
            ),
            Row(
              children: List.generate(_typeMusicTab.length,
                  (index) => _getMusicTypeTab(_typeMusicTab[index], index)),
            ),
            Padding(
                padding: const EdgeInsets.only(top: 10, bottom: 10),
                child: Row(
                  crossAxisAlignment: CrossAxisAlignment.center,
                  children: [
                    Expanded(
                      child: Container(
                        decoration: BoxDecoration(
                          color: Colors.grey.withOpacity(0.3),
                          borderRadius: BorderRadius.circular(5),
                        ),
                        child: TextField(
                          cursorColor: Colors.white,
                          decoration: InputDecoration(
                            hintText: "Artists, songs. or podcasts",
                            hintStyle: TextStyle(
                              backgroundColor: Colors.transparent,
                              color: Colors.white.withOpacity(0.7),
                            ),
                            filled: true,
                            fillColor: Colors.transparent,
                            prefixIcon: Icon(
                              Feather.search,
                              color: Colors.white.withOpacity(0.7),
                            ),
                            border: InputBorder.none,
                          ),
                          style: const TextStyle(
                            color: Colors.white,
                          ),
                        ),
                      ),
                    ),
                    Padding(
                      padding: const EdgeInsets.only(left: 10),
                      child: Container(
                        decoration: BoxDecoration(
                          color: Colors.grey.withOpacity(0.3),
                          borderRadius: BorderRadius.circular(5),
                        ),
                        child: TextButton(
                          onPressed: () {},
                          child: Text(
                            "Filters",
                            style: TextStyle(
                              fontSize: 14,
                              fontWeight: FontWeight.bold,
                              color:Colors.white.withOpacity(0.7),
                            ),
                          ),
                        ),
                      ),
                    ),
                  ],
                )),
            Padding(
              padding: const EdgeInsets.only(top: 10, bottom: 70),
              child: Column(
                children: List.generate(10, (index) => _getAlbum()),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
