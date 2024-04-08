import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

import fs from 'fs';
const packageJson = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'package.json'), 'utf-8'));

export default ({ mode }) => {
  process.env = {...process.env, ...loadEnv(mode, process.cwd())};
  
  return defineConfig({
    define: {
      __APP_VERSION__: JSON.stringify(packageJson.version),
    },
    plugins: [react()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      }
    }
  });
}
