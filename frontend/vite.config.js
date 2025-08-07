import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: './', // <- important for relative paths (especially if hosting locally or on GitHub Pages)
});
