import { IApi } from 'dumi';

export default (api: IApi) => {
//    api.addEntryImports(() => ({
//     source: '@lite-tree/react',
//     specifier: 'LiteTree'
//   }))
  api.addEntryImportsAhead(() => ({
    source: '@lite-tree/react',
    specifier: '{ LiteTree }'
  }))
  api.addEntryCodeAhead(() => `
    console.log("LiteTreeComponent=",LiteTree) 
  `)
};