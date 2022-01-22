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
  int tab = 0;
  _tapSetTab (int index) {
    setState(() {
      tab = index;
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

  Widget getBody() {
    return IndexedStack(
      index: tab,
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
        )
      ],
    );
  }

  Widget getFooter() {
    List<Map<String, dynamic>> iconList = [
      {"icon":Feather.home, "label": "Home"},
      {"icon":Feather.book, "label": "Book"},
      {"icon":Feather.search, "label": "Search"},
      {"icon":Feather.settings, "label": "Settings"}
    ];
    return Container(
      decoration: const BoxDecoration(
        gradient: LinearGradient(
          colors: [Colors.black, Colors.transparent],
          begin: Alignment.bottomCenter,
          end: Alignment.topCenter,
          stops: [0.3, 0.8],
        ),
      ),
      child: BottomNavigationBar(
        elevation: 0,
        type: BottomNavigationBarType.fixed,
        currentIndex: tab,
        backgroundColor: Colors.transparent,
        onTap: _tapSetTab,
        items: List.generate(
            iconList.length,
            (index) => BottomNavigationBarItem(
                    icon: Icon(
                  iconList[index]["icon"],
                  color: tab == index ? const Color(0xFF04be4e) : Colors.white,
                ),
                label: iconList[index]["label"],
            )),
      ),
    );
  }
}
