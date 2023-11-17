import path from 'node:path'
import {toPath} from 'url-or-path'

const toAbsolutePath = value => value ? path.resolve(toPath(value)) : value

/**
 * Yields paths between `from` and `to`.
 *
 * @param {URL | string} from
 * @param {URL | string} [to]
 * @returns {Iterator<string>}
 */
function* iterateDirectoryUp(from, to) {
  from = toAbsolutePath(from)
  const {root} = path.parse(from)
  to = toAbsolutePath(to) ?? root

  // `to` is a child directory
  if (to !== from && to.startsWith(from)) {
    return
  }

  for (let directory = from; ; directory = path.dirname(directory)) {
    yield directory

    if (directory === to || directory === root) {
      break
    }
  }
}

export default iterateDirectoryUp
