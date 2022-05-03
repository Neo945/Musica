import 'package:application/json/sample_data.dart';
// import 'package:application/pages/album_page.dart';
import 'package:application/pages/album_page_v2.dart';
import 'package:flutter/material.dart';
import 'package:flutter_font_icons/flutter_font_icons.dart';
import 'package:page_transition/page_transition.dart';

class HomePage extends StatefulWidget {
  const HomePage({Key? key}) : super(key: key);

  @override
  _HomePageState createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  int genretab1 = 0;
  int genretab2 = 3;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.black,
      appBar: getAppBar(),
      body: getBody(),
    );
  }

  PreferredSizeWidget getAppBar() {
    return AppBar(
      backgroundColor: Colors.black,
      elevation: 0,
      title: Padding(
        padding: const EdgeInsets.only(left: 10, right: 10),
        child: Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: const [
            Text(
              "Explore",
              style: TextStyle(
                fontSize: 20,
                color: Colors.white,
                fontWeight: FontWeight.bold,
              ),
            ),
            Icon(Entypo.list)
          ],
        ),
      ),
    );
  }

  Widget _getSongTypes(Function() function, int index) {
    return Padding(
      padding: const EdgeInsets.only(right: 25),
      child: GestureDetector(
        onTap: () {
          setState(function);
        },
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              song_type_2[index],
              style: TextStyle(
                  fontSize: 15,
                  color: genretab2 == index
                      ? const Color(0xFF04be4e)
                      : Colors.grey,
                  fontWeight: FontWeight.w600),
            ),
            const SizedBox(
              height: 3,
            ),
            Container(
              height: 3,
              width: 10,
              decoration: BoxDecoration(
                  color: genretab2 == index
                      ? const Color(0xFF04be4e)
                      : const Color(0x00000000)),
            )
          ],
        ),
      ),
    );
  }

  Widget _getAlbum(int index) {
    return Padding(
      padding: const EdgeInsets.only(right: 30),
      child: GestureDetector(
        onTap: () {
          Navigator.push(
            context,
            PageTransition(
              child: AlbumPageV2(
                song: songs[index],
              ),
              alignment: Alignment.bottomCenter,
              type: PageTransitionType.scale,
            ),
          );
        },
        child: Column(
          children: [
            Hero(
              tag: "album-${index + 1}",
              child: Container(
                width: 180,
                height: 180,
                decoration: BoxDecoration(
                  color: primary,
                  borderRadius: BorderRadius.circular(10),
                  image: DecorationImage(
                    image: AssetImage(
                      songs[index]['img'],
                    ),
                  ),
                ),
              ),
            ),
            const SizedBox(
              height: 20,
            ),
            Text(
              songs[index]['title'],
              style: const TextStyle(
                fontSize: 15,
                color: Colors.white,
                fontWeight: FontWeight.w600,
              ),
            ),
            const SizedBox(
              height: 5,
            ),
            SizedBox(
              width: 180,
              child: Text(
                songs[index]['description'],
                maxLines: 1,
                textAlign: TextAlign.center,
                style: const TextStyle(
                  fontSize: 12,
                  color: Colors.grey,
                  fontWeight: FontWeight.w600,
                ),
              ),
            )
          ],
        ),
      ),
    );
  }

  Widget getBody() {
    return SingleChildScrollView(
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              SingleChildScrollView(
                scrollDirection: Axis.horizontal,
                child: Padding(
                  padding: const EdgeInsets.only(top: 20, left: 30),
                  child: Row(
                    children: List.generate(song_type_1.length, (index) {
                      return _getSongTypes(() {
                        setState(() {
                          genretab1 = index;
                        });
                      }, index);
                    }),
                  ),
                ),
              ),
              const SizedBox(
                height: 20,
              ),
              SingleChildScrollView(
                scrollDirection: Axis.horizontal,
                child: Padding(
                  padding: const EdgeInsets.only(left: 30),
                  child: Row(
                    children: List.generate(songs.length - 5, (index) {
                      // print("$index songs.length - 5");
                      return _getAlbum(index);
                    }),
                  ),
                ),
              )
            ],
          ),
          const SizedBox(
            height: 10,
          ),
          Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              SingleChildScrollView(
                scrollDirection: Axis.horizontal,
                child: Padding(
                  padding: const EdgeInsets.only(top: 20, left: 30),
                  child: Row(
                    children: List.generate(song_type_2.length, (index) {
                      return _getSongTypes(() {
                        genretab2 = index;
                      }, index);
                    }),
                  ),
                ),
              ),
              const SizedBox(
                height: 20,
              ),
              SingleChildScrollView(
                scrollDirection: Axis.horizontal,
                child: Padding(
                  padding: const EdgeInsets.only(left: 30),
                  child: Row(
                    children: List.generate(songs.length - 5, (index) {
                      // print("$index songs.length - 5");
                      return _getAlbum(index + 5);
                    }),
                  ),
                ),
              )
            ],
          ),
          const SizedBox(
            height: 130,
          ),
        ],
      ),
    );
  }
}
