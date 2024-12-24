import fs from 'fs-extra'
import path from 'pathe'
import set from 'set-value'

const dirs = [
  'packages/monorepo',
  'packages/foo',
  // 'apps/cli',
  // 'apps/website',
  'apps',
]

export async function cleanProjects(cwd: string) {
  for (const dir of dirs.map((x) => {
    return path.resolve(cwd, x)
  })) {
    await fs.remove(dir)
  }
  const name = 'package.json'
  const pkgJson = await fs.readJson(name)
  // fix https://github.com/sonofmagic/monorepo-template/issues/76
  set(pkgJson, 'devDependencies.@icebreakers/monorepo', 'latest', { preservePaths: false })
  await fs.outputJson(name, pkgJson, {
    spaces: 2,
  })
}
