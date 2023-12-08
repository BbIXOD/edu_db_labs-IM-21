import { nodeExternalsPlugin } from 'esbuild-node-externals'
import { build } from 'esbuild'

try {

  build({
    entryPoints: ['./src/api.ts'],
    bundle: true,
    minify: true,
    platform: 'node',
    sourcemap: true,
    tsconfig: 'tsconfig.json',
    format: 'esm',
    plugins: [nodeExternalsPlugin()],
    outdir: 'dist'
  })
} catch (err) {
  console.log(err)
  process.exit(1)
}
