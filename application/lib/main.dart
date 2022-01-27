// import 'dart:async';

import 'package:application/root_app.dart';
import 'package:application/state/music_playing_state.dart';
import 'package:application/state/tag_state.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      theme: ThemeData.dark().copyWith(
        primaryColor: Colors.white,
      ),
      home: MultiProvider(
        child: const RootApp(),
        providers: [
          ChangeNotifierProvider(
            create: (_) => MusicPlayingState(),
          ),
          ChangeNotifierProvider(
            create: (_) => TabState(),
          ),
        ]
      ),
    );
  }
}
