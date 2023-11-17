import path from 'node:path'
import {toPath} from 'url-or-path'

/**
 * Yields paths between `from` and `to`.
 *
 * @param {URL | string} from
 * @param {URL | string} [to]
 * @returns {Iterator<string>}
 */
function* iterateDirectoryUp(from, to) {
  from = toPath(from)
  const {root} = path.parse(from)
  to = to ? toPath(to) : root

  // `to` is a child directory
  if (to !== from && to.startsWith(from)) {
    return
  }

  for (let directory = from; ; directory = path.dirname(directory)) {
    yield directory

    if (directory === to || directory === root) {
      return
    }
  }
}

export default iterateDirectoryUp
