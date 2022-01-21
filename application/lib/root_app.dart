import 'package:application/pages/home_page.dart';
import 'package:flutter/material.dart';
import 'package:flutter_font_icons/flutter_font_icons.dart';

class RootApp extends StatefulWidget {
  const RootApp({Key? key}) : super(key: key);

  @override
  _RootAppState createState() => _RootAppState();
}

class _RootAppState extends State<RootApp> {
  int tab = 0;
  @override
  Widget build(BuildContext context) {
    return Scaffold(
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
        Center(
          child: Text('Search',
              style: TextStyle(
                  fontSize: 20,
                  color: Colors.white,
                  fontWeight: FontWeight.bold)),
        ),
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
    List iconList = [
      Feather.home,
      Feather.book,
      Feather.search,
      Feather.settings
    ];
    return Container(
      height: 80,
      decoration: const BoxDecoration(color: Colors.black),
      child: Padding(
        padding: const EdgeInsets.only(left: 20, right: 20),
        child: Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: List.generate(
              iconList.length,
              (index) => IconButton(
                  onPressed: () => setState(() {
                        tab = index;
                      }),
                  icon: Icon(
                    iconList[index],
                    color:
                        tab == index ? const Color(0xFF04be4e) : Colors.white,
                    // color: Colors.white,
                  ))),
        ),
      ),
    );
  }
}
