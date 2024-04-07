import { defineConfig } from 'dumi';
import {resolve } from "path"

export default defineConfig({
  outputPath: 'docs-dist',
  themeConfig: {
    name: 'lite-tree-dumi-demo',
  },
  alias:{
    "@common": resolve(__dirname,'../../packages/common'),
    "@lite-tree/react": resolve(__dirname,'../../packages/react/dist')
  },
  // chainWebpack(memo){
  //   memo.module.rule('raw')
  //   .test(/\?raw$/i)
  //   .use('raw-loader')
  //   .loader('raw-loader')
  //   .options({
  //     esModule: false
  //   })
  //   .end();
  //   return memo
  // }
});
