import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  clean: true,
  dts: {
    compilerOptions: {
      moduleResolution: 'node',
      target: 'es2020',
      skipLibCheck: true,
    },
  },
  format: ['esm', 'cjs'],
  minify: true,
  splitting: true,
  sourcemap: true,
  treeshake: true,
  target: 'node16',
  platform: 'node',
  external: ['vite', '@vue/compiler-sfc', 'vue-loader', 'magic-string', 'chokidar', 'debug', 'tslog'],
  esbuildOptions(options) {
    options.mangleProps = /^_/;
    options.legalComments = 'none';
    options.define = {
      'process.env.NODE_ENV': '"production"',
    };
  },
  outExtension({ format }) {
    return {
      js: format === 'cjs' ? '.cjs' : '.js',
    };
  },
  onSuccess: 'node scripts/postbuild.js',
});
