import assert from 'node:assert/strict'
import path from 'node:path'
import process from 'node:process'
import test from 'node:test'
import url from 'node:url'
import iterateDirectoryUp from './index.js'

const isWin32 = path.sep === '\\'

const getDirectoryName = (path) =>
  isWin32 ? `Z:${path.replaceAll('/', '\\')}` : path

const getDirectories = (from, to) => [...iterateDirectoryUp(from, to)]

function runTest({from, to, expected}) {
  from = getDirectoryName(from)
  to = to ? getDirectoryName(to) : to
  expected = expected.map((directory) => getDirectoryName(directory))

  test(`From: '${from}'${to ? `', To: ${to}'` : ''}`, () => {
    assert.deepEqual(getDirectories(from, to), expected)
    assert.deepEqual(
      getDirectories(url.pathToFileURL(from), to ? url.pathToFileURL(to) : to),
      expected,
    )
    assert.deepEqual(
      getDirectories(
        url.pathToFileURL(from).href,
        to ? url.pathToFileURL(to).href : to,
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

runTest({from: '/a/b', expected: ['/a/b', '/a', '/']})
runTest({from: '/a/b', to: '/a', expected: ['/a/b', '/a']})
runTest({from: '/a', to: '/a', expected: ['/a']})
runTest({from: '/', to: '/', expected: ['/']})

// stop directory is not a parent directory
runTest({from: '/a', to: '/b', expected: []})

// Trialing slash doesn't matter
runTest({from: '/a/b/', to: '/a', expected: ['/a/b', '/a']})
runTest({from: '/a/b', to: '/a/', expected: ['/a/b', '/a']})
runTest({from: '/a/b/c/../', to: '/a/', expected: ['/a/b', '/a']})

// stop directory is a child directory of start directory
runTest({from: '/a', to: '/a/b', expected: []})

// Relative path
test('Relative path', () => {
  const from = './a'
  const to = process.cwd()
  assert.deepEqual(
    getDirectories(from, to),
    ['./a', '.'].map((directory) => path.resolve(directory)),
  )
})
