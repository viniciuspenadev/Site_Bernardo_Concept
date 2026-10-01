import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  output: 'static',
  vite: {
    plugins: [tailwindcss()],
    // O Tailwind roda pelo plugin do Vite; o projeto não usa PostCSS. A configuração
    // inline impede o Vite de procurar postcss.config nas pastas acima do projeto:
    // um arquivo solto em C:\ quebrava o `npm run dev` com "Failed to load PostCSS config".
    css: { postcss: { plugins: [] } },
  },
  devToolbar: { enabled: false },
});
