import * as url from 'node:url'
import {expectType} from 'tsd'
import iterateDirectoryUp from './index.js'

expectType<Generator<string>>(iterateDirectoryUp('/path/to/directory/'))
expectType<Generator<string>>(
  iterateDirectoryUp(url.pathToFileURL('/path/to/directory/')),
)
expectType<Generator<string>>(
  iterateDirectoryUp(url.pathToFileURL('/path/to/directory/').href),
)

expectType<Generator<string>>(
  iterateDirectoryUp('/path/to/directory/', '/path/to/directory/'),
)
expectType<Generator<string>>(
  iterateDirectoryUp(
    '/path/to/directory/',
    url.pathToFileURL('/path/to/directory/'),
  ),
)
expectType<Generator<string>>(
  iterateDirectoryUp(
    '/path/to/directory/',
    url.pathToFileURL('/path/to/directory/').href,
  ),
)

for (const directory of iterateDirectoryUp('/path/to/directory/')) {
  expectType<string>(directory)
}
