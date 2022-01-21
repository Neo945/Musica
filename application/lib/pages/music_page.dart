import 'package:application/json/sample_data.dart';
import 'package:audioplayers/audioplayers.dart';
import 'package:flutter/material.dart';
import 'package:flutter_font_icons/flutter_font_icons.dart';

class MusicPage extends StatefulWidget {
  const MusicPage(
      {Key? key,
      required this.title,
      required this.description,
      required this.color,
      required this.url,
      required this.img})
      : super(key: key);

  final String title;
  final String description;
  final Color color;
  final String url;
  final String img;

  @override
  _MusicPageState createState() => _MusicPageState();
}

class _MusicPageState extends State<MusicPage> {
  double _slider = 0;

  late AudioPlayer player;
  late AudioCache audioCache;
  bool isPlaying = true;

  @override
  void initState() {
    super.initState();
    initPlayer();
  }

  initPlayer() {
    player = AudioPlayer(mode: PlayerMode.LOW_LATENCY);
    audioCache = AudioCache(fixedPlayer: player);
    playSound(widget.url);
    // print(widget.url);

  }

  playSound(localPath) {
    audioCache.play(localPath);
  }

  stopSound(localPath) async {
    Uri audioFile = await audioCache.load(localPath);
    await player.setUrl(audioFile.path);
    player.stop();
  }

  seekSound(localPath) async {
    Uri audioFile = await audioCache.load(localPath);
    await player.setUrl(audioFile.path);
    player.seek(const Duration(milliseconds: 2000));
  }

  @override
  void dispose() {
    super.dispose();
    stopSound(widget.url);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.black,
      appBar: getAppBar(),
      body: getBody(),
    );
  }

  PreferredSizeWidget? getAppBar() {
    return AppBar(
      backgroundColor: Colors.black,
      elevation: 0,
      actions: [
        IconButton(
            onPressed: () {},
            icon: const Icon(
              Feather.more_vertical,
              color: Colors.white,
            ))
      ],
    );
  }

  Widget getBody() {
    var size = MediaQuery.of(context).size;
    return SingleChildScrollView(
      child: Column(
        children: [
          Stack(
            children: [
              Padding(
                padding: const EdgeInsets.only(left: 30, right: 30, top: 20),
                child: Container(
                  width: size.width - 100,
                  height: size.width - 100,
                  decoration: BoxDecoration(
                    // image: DecorationImage(image: AssetImage(widget.img), fit: BoxFit.cover),
                    boxShadow: [
                      BoxShadow(
                          color: widget.color,
                          blurRadius: 50,
                          spreadRadius: 5,
                          offset: const Offset(-10, 40))
                    ],
                    borderRadius: BorderRadius.circular(20),
                  ),
                ),
              ),
              Padding(
                padding: const EdgeInsets.only(left: 30, right: 30, top: 20),
                child: Container(
                  width: size.width - 60,
                  height: size.width - 60,
                  decoration: BoxDecoration(
                    image: DecorationImage(
                        image: AssetImage(widget.img), fit: BoxFit.cover),
                    borderRadius: BorderRadius.circular(20),
                  ),
                ),
              )
            ],
          ),
          const SizedBox(
            height: 20,
          ),
          Padding(
            padding: const EdgeInsets.only(left: 10, right: 10),
            child: SizedBox(
              width: size.width - 80,
              height: 70,
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  const Icon(
                    AntDesign.addfolder,
                    color: Colors.white,
                  ),
                  Column(
                    mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                    children: [
                      Text(
                        widget.title,
                        style: const TextStyle(
                            color: Colors.white,
                            fontSize: 18,
                            fontWeight: FontWeight.bold),
                      ),
                      SizedBox(
                        width: 150,
                        child: Text(
                          widget.description,
                          maxLines: 1,
                          textAlign: TextAlign.center,
                          style: TextStyle(
                              color: Colors.white.withOpacity(0.5),
                              fontSize: 15,
                              fontWeight: FontWeight.bold),
                        ),
                      ),
                    ],
                  ),
                  const Icon(
                    Feather.more_vertical,
                    color: Colors.white,
                  ),
                ],
              ),
            ),
          ),
          const SizedBox(
            height: 10,
          ),
          Slider(
              activeColor: primary,
              value: _slider,
              min: 0,
              max: 200,
              onChanged: (value) {
                setState(() {
                  _slider = value;
                });
                seekSound(widget.url);
              }),
          const SizedBox(
            height: 20,
          ),
          Padding(
            padding: const EdgeInsets.only(left: 30, right: 30),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Text(
                  "1:50",
                  style: TextStyle(
                    color: Colors.white.withOpacity(0.5),
                  ),
                ),
                Text(
                  "4:68",
                  style: TextStyle(
                    color: Colors.white.withOpacity(0.5),
                  ),
                ),
              ],
            ),
          ),
          const SizedBox(
            height: 25,
          ),
          Padding(
            padding: const EdgeInsets.only(left: 20, right: 20),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                const IconButton(
                    onPressed: null,
                    icon: Icon(
                      Feather.shuffle,
                      color: Colors.white,
                      size: 25,
                    )),
                const IconButton(
                    onPressed: null,
                    icon: Icon(
                      Feather.skip_back,
                      size: 25,
                      color: Colors.white,
                    )),
                IconButton(
                    iconSize: 50,
                    onPressed: () {
                      if (isPlaying) {
                        stopSound(widget.url);
                        setState(() {
                          isPlaying = false;
                        });
                      } else {
                        playSound(widget.url);
                        setState(() {
                          isPlaying = true;
                        });
                      }
                    },
                    icon: Container(
                      decoration: const BoxDecoration(
                        shape: BoxShape.circle,
                        color: primary,
                      ),
                      child: const Center(
                        child: Icon(
                          Entypo.controller_stop,
                          size: 25,
                          color: Colors.white,
                        ),
                      ),
                    )),
                const IconButton(
                    onPressed: null,
                    icon: Icon(
                      Feather.skip_forward,
                      size: 25,
                      color: Colors.white,
                    )),
                const IconButton(
                    onPressed: null,
                    icon: Icon(
                      AntDesign.retweet,
                      size: 25,
                      color: Colors.white,
                    )),
              ],
            ),
          ),
          const SizedBox(
            height: 25,
          ),
          Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: const [
              Icon(
                Feather.tv,
                color: primary,
                size: 20,
              ),
              Padding(
                padding: EdgeInsets.only(left: 20, top: 3),
                child: Text(
                  "Chrome Cast",
                  style: TextStyle(
                    color: primary,
                  ),
                ),
              )
            ],
          )
        ],
      ),
    );
  }
}
