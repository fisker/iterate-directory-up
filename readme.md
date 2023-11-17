# iterate-directory-up

[![Build Status][github_actions_badge]][github_actions_link]
[![Coverage][coveralls_badge]][coveralls_link]
[![Npm Version][package_version_badge]][package_link]
[![MIT License][license_badge]][license_link]

[github_actions_badge]: https://img.shields.io/github/actions/workflow/status/fisker/iterate-directory-up/continuous-integration.yml?barnach=main&style=flat-square
[github_actions_link]: https://github.com/fisker/iterate-directory-up/actions?query=branch%3Amain
[coveralls_badge]: https://img.shields.io/coveralls/github/fisker/iterate-directory-up/main?style=flat-square
[coveralls_link]: https://coveralls.io/github/fisker/iterate-directory-up?branch=main
[license_badge]: https://img.shields.io/npm/l/prettier-format.svg?style=flat-square
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
```

## API

### `iterateDirectoryUp(from: URL | string, to?: URL | string)`
