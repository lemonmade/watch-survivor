import {extensionRollupConfiguration} from '@watching/tools/rollup';
import {babel} from '@rollup/plugin-babel';

export default extensionRollupConfiguration(
  import.meta.url,
  {esbuild: false},
  {
    plugins: [
      babel({
        babelrc: false,
        exclude: 'node_modules/**',
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        babelHelpers: 'bundled',
        presets: [
          'babel-preset-solid',
          '@babel/preset-typescript',
          ['@babel/preset-env', {targets: ['last 2 chrome versions']}],
        ],
      }),
    ],
  },
);
