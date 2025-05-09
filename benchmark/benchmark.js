import assert from 'node:assert/strict'
import path from 'node:path'
import process from 'node:process'
import {Bench} from 'tinybench'
import versionDevelopment from '../index.js'
import version130 from './1.3.0.js'

const cwd = process.cwd()
const {root} = path.parse(cwd)

const wrap = (function_) => () => [
  ...function_(path.join(cwd, `a${path.sep}`.repeat(10))),
]

async function runBenchmark(name, tasks, assert) {
  const bench = new Bench({name})
  for (const {name, fn: function_} of tasks) {
    bench.add(name, () => {
      assert(function_())
    })
  }

  console.log(bench.name)
  await bench.run()
  console.table(bench.table())
}

await runBenchmark(
  'iterateDirectoryUp',
  [
    {name: 'development', fn: wrap(versionDevelopment)},
    {name: 'v1.3.0', fn: wrap(version130)},
  ],
  (result) => {
    assert.ok(result.includes(cwd))
    assert.equal(result.at(-1), root)
  },
)

await runBenchmark(
  'path root',
  [
    {name: 'path.parse', fn: () => path.parse(cwd).root},
    {name: 'path.resolve("/")', fn: () => path.resolve('/')},
  ],
  (result) => {
    assert.equal(result, root)
  },
)
