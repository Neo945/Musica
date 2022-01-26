import 'package:application/components/bottom_music_player.dart';
import 'package:application/json/sample_data.dart';
import 'package:application/pages/home_page.dart';
import 'package:application/pages/search_page.dart';
import 'package:application/state/music.dart';
import 'package:flutter/material.dart';
import 'package:flutter_font_icons/flutter_font_icons.dart';
import 'package:provider/provider.dart';

class RootApp extends StatelessWidget {
  const RootApp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      extendBody: true,
      backgroundColor: Colors.black,
      bottomNavigationBar: getFooter(),
      body: getBody(context),
    );
  }

  Widget getBody(context) {
    return Stack(
      children: [
        Consumer<TabState>(builder: (_, state, __) {
          print("Tab Changed1");
          return IndexedStack(
            index: state.tab,
            children: const [
              HomePage(),
              Center(
                child: Text('Library',
                  style: TextStyle(
                    fontSize: 20,
                    color: Colors.white,
                    fontWeight: FontWeight.bold,
                  ),
                ),
              ),
              SearchPage(),
              Center(
                child: Text('Settings',
                  style: TextStyle(
                    fontSize: 20,
                    color: Colors.white,
                    fontWeight: FontWeight.bold,
                  ),
                ),
              ),
            ],
          );
        }),
        Consumer<MusicPlayingState>(builder: (_, state, __) {
          return MusicBottomBar(play: state);
        }),
      ],
    );
  }

  Widget getFooter() {
    List<Map<String, dynamic>> iconList = [
      {"icon": Feather.home, "label": "Home"},
      {"icon": Feather.book, "label": "Book"},
      {"icon": Feather.search, "label": "Search"},
      {"icon": Feather.settings, "label": "Settings"}
    ];
    return Consumer<TabState>(builder: (_, state, __) {
      print("Tab Changed2");
      return Container(
        decoration: const BoxDecoration(
          gradient: LinearGradient(
            colors: [Colors.black, Colors.transparent],
            begin: Alignment.bottomCenter,
            end: Alignment.topCenter,
            stops: [0.4, 1],
          ),
        ),
        child: BottomNavigationBar(
          elevation: 0,
          type: BottomNavigationBarType.fixed,
          currentIndex: state.tab,
          backgroundColor: Colors.transparent,
          selectedItemColor: primary,
          onTap: state.setTab,
          items: List.generate(
              iconList.length,
              (index) => BottomNavigationBarItem(
                    icon: Icon(
                      iconList[index]["icon"],
                    ),
                    label: iconList[index]["label"],
                  )),
        ),
      );
    });
  }
}

