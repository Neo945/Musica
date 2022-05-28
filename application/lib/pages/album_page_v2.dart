import 'dart:ui';

import 'package:application/json/sample_data.dart';
import 'package:flutter/material.dart';
import 'package:flutter_font_icons/flutter_font_icons.dart';

class AlbumPageV2 extends StatefulWidget {
  const AlbumPageV2({Key? key, this.song}) : super(key: key);
  final dynamic song;
  @override
  _AlbumPageV2State createState() => _AlbumPageV2State();
}

class _AlbumPageV2State extends State<AlbumPageV2> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.black,
      body: getBody(),
    );
  }

  Widget _getAlbumListTile(int index) {
    return ListTile(
      title: const Text("Title"),
      subtitle: Row(
        children: const [
          Icon(Icons.download),
          Text("Subtitle"),
        ],
      ),
      trailing: const Icon(Icons.more_horiz),
    );
  }

  Widget getBody() {
    var size = MediaQuery.of(context).size;
    return Padding(
      padding: const EdgeInsets.all(10.0),
      child: Stack(
        children: [
          Row(
            children: [
              SizedBox(
                width: size.width - 20,
                child: OverflowBox(
                  maxWidth: 594,
                  maxHeight: 594,
                  child: Transform.translate(
                    offset: const Offset(-137, -228),
                    child: ClipOval(
                      child: Container(
                        decoration: BoxDecoration(
                          image: DecorationImage(
                            image: AssetImage(widget.song['img']),
                            opacity: 0.7,
                            fit: BoxFit.cover,
                          ),
                        ),
                      ),
                    ),
                  ),
                ),
              ),
              BackdropFilter(
                filter: ImageFilter.blur(sigmaX: 100.0, sigmaY: 100.0),
                child: Container(
                  decoration: BoxDecoration(
                    color: Colors.white.withOpacity(0.0),
                  ),
                ),
              ),
            ],
          ),
          SingleChildScrollView(
            child: Column(
              children: [
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
                ),
                Hero(
                  tag: 'album-${widget.song["id"]}',
                  child: Container(
                    width: size.width * 0.6,
                    height: size.width * 0.6,
                    decoration: BoxDecoration(
                      image: DecorationImage(
                        image: AssetImage(widget.song['img']),
                        fit: BoxFit.cover,
                      ),
                      borderRadius: BorderRadius.circular(10),
                    ),
                  ),
                ),
                const SizedBox(
                  height: 30,
                ),
                Text(
                  widget.song['title'],
                  style: const TextStyle(
                    fontSize: 30,
                    fontWeight: FontWeight.bold,
                    color: Colors.white,
                  ),
                ),
                const SizedBox(
                  height: 10,
                ),
                // const ListTile(
                //   leading: CircleAvatar(
                //     backgroundColor: Colors.white,
                //   ),
                //   title: Text(
                //     'Music',
                //   ),
                // ),
                Row(
                  children: const [
                    CircleAvatar(
                      backgroundColor: Colors.white,
                    ),
                    Text(
                      'Music',
                    ),
                  ],
                ),
                const SizedBox(
                  height: 10,
                ),
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Column(
                      children: [
                        const Text("Album . 2017"),
                        const SizedBox(
                          height: 10,
                        ),
                        Row(
                          children: const [
                            Icon(
                              FontAwesome.heart,
                            ),
                            Icon(
                              Icons.download_done_outlined,
                            ),
                            Icon(
                              Feather.more_horizontal,
                              color: Colors.white,
                            ),
                          ],
                        ),
                      ],
                    ),
                    Stack(
                      alignment: Alignment.bottomRight,
                      children: [
                        SizedBox.fromSize(
                          size: const Size(56, 56), // button width and height
                          child: ClipOval(
                            child: Container(
                              decoration: const BoxDecoration(
                                color: primary,
                              ),
                              child: InkWell(
                                splashColor: Colors.white, // splash color
                                onTap: () {}, // button pressed
                                child: const Icon(FontAwesome.play), // icon
                              ),
                            ),
                          ),
                        ),
                        SizedBox.fromSize(
                          size: const Size(26, 26), // button width and height
                          child: ClipOval(
                            child: Container(
                              decoration: const BoxDecoration(
                                color: Colors.white,
                              ),
                              child: InkWell(
                                splashColor: primary, // splash color
                                onTap: () {}, // button pressed
                                child: const Icon(
                                  Icons.shuffle_rounded,
                                  color: primary,
                                  size: 20,
                                ), // icon
                              ),
                            ),
                          ),
                        )
                      ],
                    ),
                  ],
                ),
                Column(
                  children:
                      List.generate(5, (index) => _getAlbumListTile(index)),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
