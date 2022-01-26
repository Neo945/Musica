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
      body: getBody(),
    );
  }

  Widget? getBottomPlayingBar(MusicPlayingState play) {
    List<Icon> playingIcons = [
      const Icon(
        Feather.cast,
        color: Colors.white,
      ),
      const Icon(
        Feather.pause,
        color: Colors.white,
      ),
    ];
    playingIcons.insert(
      1,
      play.music!.liked
          ? const Icon(AntDesign.like1, color: primary)
          : const Icon(AntDesign.like2, color: Colors.white),
    );
    return Column(
      mainAxisAlignment: MainAxisAlignment.end,
      children: [
        SafeArea(
          child: Padding(
            padding: const EdgeInsets.all(8.0),
            child: Container(
              height: 60,
              decoration: BoxDecoration(
                borderRadius: BorderRadius.circular(5),
                color: const Color(0xFF86B7AE),
              ),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Padding(
                    padding: const EdgeInsets.all(10.0),
                    child: Container(
                      width: 40,
                      height: 40,
                      decoration: const BoxDecoration(
                          image: DecorationImage(
                        image: AssetImage('assets/images/default_cover.jpg'),
                      )),
                    ),
                  ),
                  Expanded(
                    flex: 7,
                    child: Column(
                      mainAxisAlignment: MainAxisAlignment.center,
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          play.music!.title,
                          style: const TextStyle(
                            fontWeight: FontWeight.bold,
                            fontSize: 17,
                          ),
                        ),
                        Text(
                          play.music!.artist.user.username,
                          style: TextStyle(
                            fontWeight: FontWeight.bold,
                            fontSize: 15,
                            color: Colors.white.withOpacity(0.7),
                          ),
                        ),
                      ],
                    ),
                  ),
                  Row(
                    children: List.generate(playingIcons.length, (index) {
                      return IconButton(
                        onPressed: () {},
                        icon: playingIcons[index],
                      );
                    }),
                  ),
                ],
              ),
            ),
          ),
        )
      ],
    );
  }

  Widget getBody() {
    return Stack(
      children: [
        Consumer<TabState>(builder: (_, state, __) {
          print("object1");
          return IndexedStack(
            index: state.tab,
            children: const [
              HomePage(),
              Center(
                child: Text('Library',
                    style: TextStyle(
                        fontSize: 20,
                        color: Colors.white,
                        fontWeight: FontWeight.bold)),
              ),
              SearchPage(),
              Center(
                child: Text('Settings',
                    style: TextStyle(
                        fontSize: 20,
                        color: Colors.white,
                        fontWeight: FontWeight.bold)),
              ),
            ],
          );
        }),
        Consumer<MusicPlayingState>(builder: (_, play, __) {
          print("object");
          return play.music != null ? getBottomPlayingBar(play)! : Container();
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
    return Consumer<TabState>(
      builder: (_, state, __) => Container(
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
      ),
    );
  }
}
