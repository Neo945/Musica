import 'package:application/json/sample_data.dart';
import 'package:application/pages/home_page.dart';
import 'package:application/pages/search_page.dart';
import 'package:flutter/material.dart';
import 'package:flutter_font_icons/flutter_font_icons.dart';

class RootApp extends StatefulWidget {
  const RootApp({Key? key}) : super(key: key);

  @override
  _RootAppState createState() => _RootAppState();
}

class _RootAppState extends State<RootApp> {
  int _tab = 0;
  late Map<String, dynamic> playing;

  @override
  void initState() {
    playing = {
      "name": "Name",
      "artist": "Artist Name",
      "img": "assets/images/img_3.jpg",
      "liked": true,
    };
    super.initState();
  }

  _tapSetTab(int index) {
    setState(() {
      _tab = index;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      extendBody: true,
      backgroundColor: Colors.black,
      bottomNavigationBar: getFooter(),
      body: getBody(),
    );
  }

  Widget? getBottomPlayingBar() {
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
    if (playing != {}) {
      // Icon(AntDesign.like1, color: playing['liked'] ? primary : Colors.white,),
      playingIcons.insert(1, playing['liked']
        ? const Icon(AntDesign.like1, color: primary)
        : const Icon(AntDesign.like2, color: Colors.white)
      );
    }
    return playing != {}
        ? Column(
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
                            decoration: BoxDecoration(
                                image: DecorationImage(
                              image: AssetImage(playing["img"]),
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
                                playing["name"],
                                style: const TextStyle(
                                  fontWeight: FontWeight.bold,
                                  fontSize: 17,
                                ),
                              ),
                              Text(
                                playing["artist"],
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
          )
        : null;
  }

  Widget getBody() {
    return Stack(
      children: [
        IndexedStack(
          index: _tab,
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
        ),
        getBottomPlayingBar()!,
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
        currentIndex: _tab,
        backgroundColor: Colors.transparent,
        selectedItemColor: primary,
        onTap: _tapSetTab,
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
  }
}
