import * as path from 'node:path'
import {toPath} from 'url-or-path'

/** @typedef {import('url-or-path').UrlOrPath}  UrlOrPath */

/** @type {(urlOrPath: UrlOrPath) => string} */
const toAbsolutePath = (value) => path.resolve(toPath(value))

/**
 * Yields paths between `from` and `to`.
 *
 * @param {UrlOrPath} from
 * @param {UrlOrPath} [to]
 * @returns {IterableIterator<string>}
 */
function* iterateDirectoryUp(from, to) {
  from = toAbsolutePath(from)
  const {root} = path.parse(from)
  to = to ? toAbsolutePath(to) : root

  // `from` is not a child directory of `stopDirectory`
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
