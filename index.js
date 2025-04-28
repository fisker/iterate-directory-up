import * as path from 'node:path'
import {toAbsolutePath} from 'url-or-path'

/** @import {UrlOrPath} from 'url-or-path' */

/**
 * Yields paths between `from` and `to`.
 *
 * @param {UrlOrPath} from
 * @param {UrlOrPath} [to]
 * @returns {Generator<string>}
 */
function* iterateDirectoryUp(from, to) {
  from = toAbsolutePath(from)
  to = to ? toAbsolutePath(to) : path.parse(from).root

  // `from` is not a child directory of `to`
  if (from !== to && !from.startsWith(to)) {
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
