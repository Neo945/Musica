import 'package:flutter/foundation.dart';

class TabState with ChangeNotifier {
  int tab = 0;

  void setTab(int tab) {
    this.tab = tab;
    notifyListeners();
  }
}
