import 'package:application/json/sample_data.dart';
import 'package:application/state/music_playing_state.dart';
import 'package:flutter/material.dart';
import 'package:flutter_font_icons/flutter_font_icons.dart';

class MusicBottomBar extends StatefulWidget {
  const MusicBottomBar({Key? key, required this.play}) : super(key: key);
  final MusicPlayingState play;

  @override
  State<MusicBottomBar> createState() => _MusicBottomBarState();
}

class _MusicBottomBarState extends State<MusicBottomBar> {
  final GlobalKey _key2 = GlobalKey();
  late double posy;
  final List<Icon> playingIcons = [
    const Icon(
      Feather.cast,
      color: Colors.white,
    ),
    const Icon(
      Feather.pause,
      color: Colors.white,
    ),
  ];

  final ValueNotifier<double> opacity = ValueNotifier(1.0);

  onDragEnd(_) {
    if (opacity.value == 0) {
      widget.play.play(null, false);
    }
    setState(() {
      opacity.value = 1;
    });
  }

  onDragStart() {
    RenderBox box2 = _key2.currentContext!.findRenderObject() as RenderBox;
    Offset position2 = box2.localToGlobal(Offset.zero);
    setState(() {
      posy = position2.dy;
    });
  }

  onDragUpdate(DragUpdateDetails details) {
    double op = 1 -
        (details.localPosition.dy - posy) /
            (MediaQuery.of(context).size.height - posy);
    setState(() {
      opacity.value = op.clamp(0, 1);
    });
  }

  @override
  void initState() {
    super.initState();
    if (widget.play.music != null) {
      playingIcons.insert(
        1,
        widget.play.music!.liked
            ? const Icon(AntDesign.like1, color: primary)
            : const Icon(AntDesign.like2, color: Colors.white),
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    Widget com = component();
    if (widget.play.music != null) {
      return Draggable<MusicPlayingState>(
        onDragStarted: onDragStart,
        onDragUpdate: onDragUpdate,
        onDragEnd: onDragEnd,
        data: widget.play,
        axis: Axis.vertical,
        childWhenDragging: Container(),
        child: component(),
        feedback: Material(
          color: Colors.transparent,
          child: Container(
            constraints: BoxConstraints(
              maxWidth: MediaQuery.of(context).size.width,
              minHeight: MediaQuery.of(context).size.height,
            ),
            child: com,
          ),
        ),
      );
    }
    return com;
  }

  Widget component() {
    return Column(
      mainAxisAlignment: MainAxisAlignment.end,
      children: [
        Padding(
          key: _key2,
          padding: const EdgeInsets.all(8.0),
          child: ValueListenableBuilder<double>(
            valueListenable: opacity,
            builder: (context, value, child) {
              return Opacity(
                opacity: opacity.value,
                child: Container(
                  child: child,
                  height: 60,
                  decoration: BoxDecoration(
                    borderRadius: BorderRadius.circular(5),
                    color: const Color(0xFF86B7AE).withOpacity(value),
                  ),
                ),
              );
            },
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
                      image: AssetImage('assets/images/img_3.jpg'),
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
                        widget.play.music!.title,
                        style: const TextStyle(
                          fontWeight: FontWeight.bold,
                          fontSize: 17,
                        ),
                      ),
                      Text(
                        'play.music!.artist.user.username',
                        maxLines: 1,
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
        const SizedBox(height: 50)
      ],
    );
  }
}
