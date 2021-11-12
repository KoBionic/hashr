<p align="center"><img height="150" src="docs/hashr_banner.png" alt="HashR"></p>

[![pipeline status](https://github.com/KoBionic/hashr/workflows/Build/badge.svg?branch=main)](https://github.com/KoBionic/hashr/actions)
[![license](https://img.shields.io/badge/license-Apache--2.0-blue.svg)](https://github.com/KoBionic/hashr/blob/main/LICENSE)
[![code style](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://prettier.io)

---

An easy to use file hashing utility working with multiple algorithms. Powered by [React](https://reactjs.org/) & [Material UI](https://material-ui.com/), built as a cross-plaform desktop application using [Electron](https://www.electronjs.org/).

---

## Usage

After starting the application, **drag & drop** your target file to window's central area. File information will automatically be filled up.

The `Compare To` field is _optional_. However, you might want to fill it up to have a **comparison** made between this field an the digest generated from given file.

<p align="center"><img alt="Step 1" src="docs/screenshot_step_01.png" /></p>

Then, click on the _arrow down button_ to go to the **hashing algorithm selection step** where you can select between algorithms available on your platform.

<p align="center"><img alt="Step 2" src="docs/screenshot_step_02.png" /></p>

Click again on the _arrow down button_ to go to the **process screen**. Upon completion, generated digest will appear in the `Hash` field.

A comparison will be done only if a string was entered in the `Compare To` field during first step.

<p align="center"><img alt="Step 3" src="docs/screenshot_step_03.png" /></p>

Finally, clicking again on the button will get you back to first step.

## Authors

- [**Jeremie Rodriguez**](https://github.com/jeremiergz) &lt;[jeremie.rodriguez@kobionic.com](mailto:jeremie.rodriguez@kobionic.com)&gt; - Main developer

## License

This project is licensed under the Apache License 2.0 - see the [LICENSE](<[LICENSE](https://github.com/KoBionic/hashr/blob/main/LICENSE)>) file for details.

---

[<p align="center"><img align="center" height="30" src="docs/kobionic_banner_dark.png" alt="KoBionic"></p>](https://github.com/KoBionic/)
