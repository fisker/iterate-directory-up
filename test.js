import url from 'node:url'
import path from 'node:path'
import process from 'node:process'
import test from 'ava'
import iterateDirectoryUp from './index.js'

const isWin32 = path.sep === '\\'

const getDirectoryName = (path) =>
  isWin32 ? `D:${path.replaceAll('/', '\\')}` : path

const getDirectories = (from, to) => [...iterateDirectoryUp(from, to)]

function runTest({from, to, expected}) {
  from = getDirectoryName(from)
  to = to ? getDirectoryName(to) : to
  expected = expected.map((directory) => getDirectoryName(directory))

  test(`From: '${from}'${to ? `', To: ${to}'` : ''}`, (t) => {
    t.deepEqual(getDirectories(from, to), expected)
    t.deepEqual(
      getDirectories(url.pathToFileURL(from), to ? url.pathToFileURL(to) : to),
      expected,
    )
    t.deepEqual(
      getDirectories(
        url.pathToFileURL(from).href,
        to ? url.pathToFileURL(to).href : to,
      ),
      expected,
    )
  })
}

runTest({from: '/a/b', expected: ['/a/b', '/a', '/']})
runTest({from: '/a/b', to: '/a', expected: ['/a/b', '/a']})

// stop directory is not a parent directory
runTest({from: '/a', to: '/b', expected: ['/a', '/']})

// Trialing slash doesn't matter
runTest({from: '/a/b/', to: '/a', expected: ['/a/b', '/a']})
runTest({from: '/a/b', to: '/a/', expected: ['/a/b', '/a']})
runTest({from: '/a/b/c/../', to: '/a/', expected: ['/a/b', '/a']})

// stop directory is a child directory of start directory
runTest({from: '/a', to: '/a/b', expected: []})

// Relative path
test('Relative path', t => {
  const from = './a'
  const to = process.cwd()
  t.deepEqual(getDirectories(from, to), ['./a','.'].map(directory => path.resolve(directory)))
})
