import * as path from 'node:path'
import process from 'node:process'
import {toAbsolutePath} from 'url-or-path'

/** @import {OptionalUrlOrPath} from 'url-or-path' */

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
  let directory = toAbsolutePath(from) ?? process.cwd()
  let stopDirectory = toAbsolutePath(to)

  if (stopDirectory) {
    const relation = path.relative(stopDirectory, directory)

    // `directory` is not a child directory of `stopDirectory`
    if (relation[0] === '.' || relation === directory) {
      return
    }
  }

  stopDirectory = stopDirectory
    ? directory.slice(0, stopDirectory.length)
    : path.resolve('/')

  while (directory !== stopDirectory) {
    yield directory
    directory = path.dirname(directory)
  }

  yield stopDirectory
}

export default iterateDirectoryUp
