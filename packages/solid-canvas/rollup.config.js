import { nodeResolve } from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import withSolid from 'rollup-preset-solid';
import jsx from 'acorn-jsx';

export default withSolid({
  input: 'lib/solid-canvas.ts',
  output: {
    dir: 'output',
    format: 'umd',
    name: 'bundle'
  },
  acornInjectPlugins: [jsx()],
  plugins: [typescript({ jsx: 'preserve' }), nodeResolve()]
});