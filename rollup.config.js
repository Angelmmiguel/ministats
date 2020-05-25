import svelte from 'rollup-plugin-svelte';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import livereload from 'rollup-plugin-livereload';
import { terser } from 'rollup-plugin-terser';

const production = !process.env.ROLLUP_WATCH;

export default {
  input: 'client/index.js',
  output: {
    sourcemap: true,
    format: 'iife',
    name: 'app',
    file: 'public/build/bundle.js'
  },
  plugins: [
    svelte({
      // enable run-time checks when not in production
      dev: !production,
      // Extract CSS
      css: css => {
        css.write('public/build/bundle.css');
      }
    }),
    
    resolve({
      browser: true,
      dedupe: ['svelte']
    }),
    commonjs(),
    
    // Watch the `public` directory on development
    !production && livereload('public'),
    
    // For production, minify assets
    production && terser()
  ],
  watch: {
    clearScreen: false
  }
};