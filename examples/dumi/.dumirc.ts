import { defineConfig } from 'dumi';
import {resolve } from "path"
import LiteTreePlugin from "@lite-tree/dumi-plugin"

export default defineConfig({
  outputPath: 'docs-dist',
  themeConfig: {
    name: 'lite-tree-dumi-demo',
  },
  alias:{
    "@common": resolve(__dirname,'../../packages/common'),
    "@lite-tree/react": resolve(__dirname,'../../packages/react')
  },
  plugins:[
    "@lite-tree/dumi-plugin"
  ]
});
