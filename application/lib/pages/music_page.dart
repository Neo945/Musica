import 'dart:async';

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
  bool _isPlaying = true;
  List<int> _time = [0, 0, 1];
  List<int> _currentTime = [0, 0, 1];
  late Timer _timer;

  @override
  void initState() {
    super.initState();
    initPlayer();
  }

  initPlayer() {
    player = AudioPlayer(mode: PlayerMode.MEDIA_PLAYER);
    playSound("https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3");
  }

  playSound(localPath) async {
    player.play(localPath, isLocal: false).then((value) async {
      moveSlider();
      await Future.delayed(const Duration(seconds: 2));
      player.getDuration().then((data) {
        if (_time[2] == 1) {
          setState(() {
            _time = _msToSec(data);
            _isPlaying = true;
          });
        }
      });
    });
  }

  moveSlider() {
    _timer = Timer.periodic(const Duration(seconds: 1), (timer) {
      if (_currentTime[2] == _time[2] && _currentTime[2] != 1) {
        _timer.cancel();
        setState(() {
          _isPlaying = false;
        });
        return;
      }
      setState(() {
        player.getCurrentPosition().then((data) {
          _currentTime = _msToSec(data.toInt());
        });
      });
    });
  }

  stopSound(localPath) async {
    await player.stop();
    _timer.cancel();
    setState(() {
      _isPlaying = false;
    });
  }

  pauseSound() async {
    await player.pause();
    setState(() {
      _isPlaying = false;
    });
  }

  resumeSound() async {
    await player.resume();
    setState(() {
      _isPlaying = true;
    });
  }

  seekSound(ms) async {
    await player.seek(Duration(milliseconds: ms));
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

  List<int> _msToSec(int ms) {
    return [
      Duration(milliseconds: ms).inMinutes,
      Duration(milliseconds: ms).inSeconds,
      ms
    ];
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
                      image: AssetImage(widget.img),
                      fit: BoxFit.cover,
                    ),
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
              value: _currentTime[2].toDouble(),
              min: 0,
              max: _time[2].toDouble(),
              onChanged: (value) {
                // setState(() {
                //   _slider = value;
                // });
                seekSound(value.toInt());
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
                  "${_currentTime[0]}:${_currentTime[1] - _currentTime[0] * 60}",
                  style: TextStyle(
                    color: Colors.white.withOpacity(0.5),
                  ),
                ),
                Text(
                  "${_time[0]}:${_time[1] - _time[0] * 60}",
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
                IconButton(
                    onPressed: () async {},
                    icon: const Icon(
                      Feather.skip_back,
                      size: 25,
                      color: Colors.white,
                    )),
                IconButton(
                    iconSize: 50,
                    onPressed: () {
                      if (_isPlaying) {
                        pauseSound();
                      } else {
                        resumeSound();
                      }
                    },
                    icon: Container(
                      decoration: const BoxDecoration(
                        shape: BoxShape.circle,
                        color: primary,
                      ),
                      child: Center(
                        child: Icon(
                          _isPlaying
                              ? Entypo.controller_play
                              : Entypo.controller_stop,
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
