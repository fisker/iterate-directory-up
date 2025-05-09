import assert from 'node:assert/strict'
import path from 'node:path'
import process from 'node:process'
import {Bench} from 'tinybench'
import versionDevelopment from '../index.js'
import version130 from './1.3.0.js'

const cwd = process.cwd()
const {root} = path.parse(cwd)

const wrap = (function_) => () => {
  const result = [...function_(path.join(cwd, `a${path.sep}`.repeat(10)))]
  assert.ok(result.includes(cwd))
  assert.equal(result.at(-1), root)
}

const bench = new Bench({
  name: 'Benchmark',
})

bench.add('development', wrap(versionDevelopment))
bench.add('v1.3.0', wrap(version130))

await bench.run()
console.table(bench.table())
