import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';

class LoginPageState extends StatefulWidget {
  @override
  State<StatefulWidget> createState() => _LoginPage();
}

class _LoginPage extends State<LoginPageState> {
  @override
  Widget build(BuildContext context) {
    return Column(
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        const TextField(
          
        ),
        const SizedBox(
          height: 20,
        ),
        const TextField(),
        const SizedBox(
          height: 20,
        ),
        TextButton(
          style: TextButton.styleFrom(
            onSurface: Colors.black,
          ),
          onPressed: () => {},
          child: const Text('data'),
        )
      ],
    );
  }
}
