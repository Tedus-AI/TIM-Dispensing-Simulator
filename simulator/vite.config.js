import { defineConfig } from 'vite';

// Relative asset paths so the same build runs from the local launcher (http://127.0.0.1:5173/)
// and from a GitHub Pages project path (/TIM-Dispensing-Simulator/).
export default defineConfig({
  base: './',
});
