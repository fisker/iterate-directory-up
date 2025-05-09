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
  let directory = toAbsolutePath(from) ?? process.cwd()
  const stopDirectory = toAbsolutePath(to) ?? path.parse(directory).root
  const relation = path.relative(stopDirectory, directory)

  // `directory` is not a child directory of `stopDirectory`
  if (relation.startsWith('..') || relation === directory) {
    return
  }

  while (true) {
    yield directory

    if (!path.relative(stopDirectory, directory)) {
      break
    }

    directory = path.dirname(directory)
  }
}

export default iterateDirectoryUp
