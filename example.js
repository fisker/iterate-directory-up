import iterateDirectoryUp from 'iterate-directory-up'

for (const directory of iterateDirectoryUp()) {
  console.log(directory)
}
