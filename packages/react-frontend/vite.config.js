import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/portfolio/',  // This ensures the correct asset paths for GitHub Pages
  build: {
    outDir: 'dist',
  }
});