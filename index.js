import * as path from 'node:path'
import process from 'node:process'
import {toAbsolutePath} from 'url-or-path'

/** @import {UrlOrPath, OptionalUrlOrPath} from 'url-or-path' */

/**
Yields paths between `from` and `to`.

@param {OptionalUrlOrPath} [from] - The directory iteration starts.
@param {OptionalUrlOrPath} [to] - The directory iteration stops.
@returns {Generator<string>}

@example
```js
import iterateDirectoryUp from 'iterate-directory-up'

for (const directory of iterateDirectoryUp('/a/b')) {
  console.log(directory)
}
// "/a/b"
// "/a"
// "/"
```
*/
function* iterateDirectoryUp(from, to) {
  from = toAbsolutePath(from) ?? process.cwd()
  to = toAbsolutePath(to) ?? path.parse(from).root

  // `from` is not a child directory of `to`
  if (!from.startsWith(to)) {
    return
  }

  for (
    let directory = from;
    directory !== to;
    directory = path.dirname(directory)
  ) {
    yield directory
  }

  yield to
}

export default iterateDirectoryUp
