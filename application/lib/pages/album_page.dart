import 'package:application/json/sample_data.dart';
import 'package:application/pages/music_page.dart';
import 'package:flutter/material.dart';
import 'package:flutter_font_icons/flutter_font_icons.dart';
import 'package:page_transition/page_transition.dart';

class AlbumPage extends StatefulWidget {
  const AlbumPage({Key? key, this.song}) : super(key: key);
  final dynamic song;
  @override
  _AlbumPageState createState() => _AlbumPageState();
}

class _AlbumPageState extends State<AlbumPage> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.black,
      body: getBody(),
    );
  }

  Widget getBody() {
    var size = MediaQuery.of(context).size;
    return SingleChildScrollView(
      child: Stack(
        children: [
          Column(
            children: [
              Container(
                width: size.width,
                height: 220,
                decoration: BoxDecoration(
                  image: DecorationImage(
                      image: AssetImage(widget.song['img']), fit: BoxFit.cover),
                ),
              ),
              const SizedBox(
                height: 30,
              ),
              Padding(
                padding: const EdgeInsets.only(right: 30, left: 30),
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Text(
                      widget.song['title'],
                      style: const TextStyle(
                        fontSize: 18,
                        fontWeight: FontWeight.bold,
                        color: Colors.white,
                      ),
                    ),
                    Container(
                      decoration: BoxDecoration(
                        color: Colors.grey,
                        borderRadius: BorderRadius.circular(5),
                      ),
                      child: const Padding(
                        padding: EdgeInsets.only(
                            left: 12, right: 12, top: 8, bottom: 8),
                        child: Text(
                          "Subscribe",
                          style: TextStyle(
                            color: Colors.white,
                          ),
                        ),
                      ),
                    )
                  ],
                ),
              ),
              const SizedBox(
                height: 30,
              ),
              SingleChildScrollView(
                scrollDirection: Axis.horizontal,
                child: Padding(
                  padding: const EdgeInsets.only(left: 30),
                  child: Row(
                    children: List.generate(songs.length - 5, (index) {
                      return Padding(
                        padding: const EdgeInsets.only(right: 30),
                        child: GestureDetector(
                          onTap: () {
                            Navigator.push(
                                context,
                                PageTransition(
                                    child: MusicPage(
                                      title: songs[index]['title'],
                                      description: songs[index]['description'],
                                      color: songs[index]['color'],
                                      img: songs[index]['img'],
                                      url: songs[index]['song_url'],
                                    ),
                                    alignment: Alignment.bottomCenter,
                                    type: PageTransitionType.scale));
                          },
                          child: Column(
                            children: [
                              Container(
                                width: 180,
                                height: 180,
                                decoration: BoxDecoration(
                                    color: primary,
                                    borderRadius: BorderRadius.circular(10),
                                    image: DecorationImage(
                                        image: AssetImage(
                                            songs[index + 5]['img']))),
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
                                width: size.width - 210,
                                child: Padding(
                                  padding: const EdgeInsets.only(
                                      left: 10, right: 10),
                                  child: Row(
                                    mainAxisAlignment:
                                        MainAxisAlignment.spaceBetween,
                                    children: [
                                      Text(
                                        songs[index]['song_count'],
                                        maxLines: 1,
                                        textAlign: TextAlign.center,
                                        style: const TextStyle(
                                          fontSize: 12,
                                          color: Colors.grey,
                                          fontWeight: FontWeight.w600,
                                        ),
                                      ),
                                      Text(
                                        songs[index]['date'],
                                        maxLines: 1,
                                        textAlign: TextAlign.center,
                                        style: const TextStyle(
                                          fontSize: 12,
                                          color: Colors.grey,
                                          fontWeight: FontWeight.w600,
                                        ),
                                      )
                                    ],
                                  ),
                                ),
                              )
                            ],
                          ),
                        ),
                      );
                    }),
                  ),
                ),
              ),
              const SizedBox(
                height: 30,
              ),
              Column(
                children: List.generate(widget.song['songs']?.length, (index) {
                  return Padding(
                    padding:
                        const EdgeInsets.only(left: 30, right: 30, bottom: 10),
                    child: GestureDetector(
                      onTap: () {
                        Navigator.push(
                                context,
                                PageTransition(
                                    child: MusicPage(
                                      title: widget.song['songs'][index]['title'],
                                      description: widget.song['songs'][index]['description'],
                                      color: widget.song['songs'][index]['color'],
                                      img: widget.song['songs'][index]['img'],
                                      url: widget.song['songs'][index]['song_url'],
                                    ),
                                    alignment: Alignment.bottomCenter,
                                    type: PageTransitionType.scale));
                      },
                      child: Row(
                        children: [
                          SizedBox(
                            width: (size.width - 60) * 0.77,
                            child: Text(
                              "${index + 1} " + widget.song['songs'][index]['title'],
                              style: const TextStyle(
                                color: Colors.white,
                              ),
                            ),
                          ),
                          SizedBox(
                            width: (size.width - 60) * 0.23,
                            child: Row(
                              mainAxisAlignment: MainAxisAlignment.spaceAround,
                              children: [
                                Text(
                                  widget.song['songs'][index]['duration'],
                                  style: const TextStyle(
                                    color: Colors.grey,
                                    fontSize: 14,
                                  ),
                                ),
                                Container(
                                  width: 25,
                                  height: 25,
                                  decoration: BoxDecoration(
                                    shape: BoxShape.circle,
                                    color: Colors.grey.withOpacity(0.8),
                                  ),
                                  child: const Center(
                                    child: Icon(
                                      Icons.play_arrow,
                                      color: Colors.white,
                                      size: 16,
                                    ),
                                  ),
                                )
                              ],
                            ),
                          )
                        ],
                      ),
                    ),
                  );
                }),
              )
            ],
          ),
          SafeArea(
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                IconButton(
                  onPressed: () => Navigator.pop(context),
                  icon: const Icon(
                    Icons.arrow_back_ios,
                    color: Colors.white,
                  ),
                ),
                IconButton(
                  onPressed: () => Navigator.pop(context),
                  icon: const Icon(
                    Feather.more_vertical,
                    color: Colors.white,
                  ),
                ),
              ],
            ),
          )
        ],
      ),
    );
  }
}
