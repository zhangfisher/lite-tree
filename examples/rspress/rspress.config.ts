import * as path from 'path'; 
import { defineConfig } from 'rspress/config';
import { fileURLToPath } from 'url';

export default defineConfig({
  root: path.join(__dirname, 'docs'),
  title: ' LiteTree for Rspress',
  description: 'LiteTree for repress demo',
  icon: '/rspress-icon.png',
  logo: {
    light: '/rspress-light-logo.png',
    dark: '/rspress-dark-logo.png',
  },
  themeConfig: {
    socialLinks: [
      { icon: 'github', mode: 'link', content: 'https://github.com/web-infra-dev/rspress' },
    ],
  }
});
