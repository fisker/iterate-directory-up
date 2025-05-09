import assert from 'node:assert/strict'
import path from 'node:path'
import process from 'node:process'
import test from 'node:test'
import url from 'node:url'
import iterateDirectoryUp from './index.js'

const isWindows = path.sep === '\\'
let DRIVE_LETTER
if (isWindows) {
  DRIVE_LETTER = process.cwd()[0].toLowerCase() === 'z' ? 'A' : 'Z'
}

const getDirectoryName = (path) =>
  isWindows ? `${DRIVE_LETTER}:${path.replaceAll('/', '\\')}` : path

const getDirectories = (from, to) => [...iterateDirectoryUp(from, to)]

function runTest(arguments_, expected) {
  arguments_ = arguments_.map((directory) =>
    directory ? getDirectoryName(directory) : directory,
  )
  expected = expected.map((directory) => getDirectoryName(directory))

  const [from, to] = arguments_
  test(`From: '${from}'${to ? `', To: ${to}'` : ''}`, () => {
    assert.deepEqual(getDirectories(...arguments_), expected)
    assert.deepEqual(
      getDirectories(
        ...arguments_.map((directory) =>
          directory ? url.pathToFileURL(directory) : directory,
        ),
      ),
      expected,
    )
    assert.deepEqual(
      getDirectories(
        ...arguments_.map((directory) =>
          directory ? url.pathToFileURL(directory).href : directory,
        ),
      ),
      expected,
    )
  })
}

test('No arguments', () => {
  const directories = getDirectories()
  assert.ok(Array.isArray(directories))
  assert.equal(directories[0], process.cwd())
  assert.equal(directories.at(-1), path.resolve('/'))
})

runTest(['/a/b'], ['/a/b', '/a', '/'])
runTest(['/a/b', '/a'], ['/a/b', '/a'])
runTest(['/a', '/a'], ['/a'])
runTest(['/', '/'], ['/'])

// stop directory is not a parent directory
runTest(['/a', '/b'], [])
runTest(['/aa', '/a'], [])

// Trialing slash doesn't matter
runTest(['/a/b/', '/a'], ['/a/b', '/a'])
runTest(['/a/b', '/a/'], ['/a/b', '/a'])
runTest(['/a/b/c/../', '/a/'], ['/a/b', '/a'])

// stop directory is a child directory of start directory
runTest(['/a', '/a/b'], [])

// Relative path
test('Relative path', () => {
  const from = './a'
  const to = process.cwd()
  assert.deepEqual(
    getDirectories(from, to),
    ['./a', '.'].map((directory) => path.resolve(directory)),
  )
})

// Case insensitive
if (isWindows) {
  test('Case insensitive', () => {
    const expected = [String.raw`Z:\a\b`, String.raw`Z:\a`]
    // Drive letter
    assert.deepEqual(
      getDirectories(String.raw`Z:\a\b`, String.raw`z:\a`),
      expected,
    )
    // Directory name
    assert.deepEqual(
      getDirectories(String.raw`Z:\a\b`, String.raw`Z:\A`),
      expected,
    )
  })
}
