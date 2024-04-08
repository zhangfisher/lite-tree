import { defineConfig } from 'dumi';

export default defineConfig({
  outputPath: 'docs-dist',
  themeConfig: {
    name: 'lite-tree-dumi-demo',
  },
  alias:{
    // "@common": resolve(__dirname,'../../packages/common'),
    // "@lite-tree/react": resolve(__dirname,'../../packages/react/dist')
  }
});
