import * as url from 'node:url'
import {expectType} from 'tsd'
import iterateDirectoryUp from './index.js'

expectType<IterableIterator<string>>(iterateDirectoryUp('/path/to/directory/'))
expectType<IterableIterator<string>>(
  iterateDirectoryUp(url.pathToFileURL('/path/to/directory/')),
)
expectType<IterableIterator<string>>(
  iterateDirectoryUp(url.pathToFileURL('/path/to/directory/').href),
)

expectType<IterableIterator<string>>(
  iterateDirectoryUp('/path/to/directory/', '/path/to/directory/'),
)
expectType<IterableIterator<string>>(
  iterateDirectoryUp(
    '/path/to/directory/',
    url.pathToFileURL('/path/to/directory/'),
  ),
)
expectType<IterableIterator<string>>(
  iterateDirectoryUp(
    '/path/to/directory/',
    url.pathToFileURL('/path/to/directory/').href,
  ),
)

for (const directory of iterateDirectoryUp('/path/to/directory/')) {
  expectType<string>(directory)
}
