# iterate-directory-up

[![Npm Version][package_version_badge]][package_link]
[![MIT License][license_badge]][license_link]
[![Coverage][coverage_badge]][coverage_link]

[coverage_badge]: https://img.shields.io/codecov/c/github/fisker/iterate-directory-up.svg?style=flat-square
[coverage_link]: https://app.codecov.io/gh/fisker/iterate-directory-up
[license_badge]: https://img.shields.io/npm/l/iterate-directory-up.svg?style=flat-square
[license_link]: https://github.com/fisker/iterate-directory-up/blob/main/license
[package_version_badge]: https://img.shields.io/npm/v/iterate-directory-up.svg?style=flat-square
[package_link]: https://www.npmjs.com/package/iterate-directory-up

> Iterate directory up.

## Install

```bash
yarn add iterate-directory-up
```

## Usage

```js
import iterateDirectoryUp from 'iterate-directory-up'

for (const directory of iterateDirectoryUp('/a/b')) {
  console.log(directory)
}
// "/a/b"
// "/a"
// "/"
```

## API

### `iterateDirectoryUp(from: URL | string, to?: URL | string)`
