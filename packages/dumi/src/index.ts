import { IApi } from 'dumi';

export default (api: IApi) => {
  // api.addEntryImportsAhead(() => ({
  //   source: '@lite-tree/react',
  //   specifier: '{ LiteTree }'
  // }))
  // api.addEntryCodeAhead(() => `
  //   console.log("LiteTreeComponent=",LiteTree) 
  // `)
  
  //@ts-ignore
  api.modifyTheme((memo:any) => {
    memo.builtins['LiteTree'] = {
      source: '@lite-tree/react',
      specifier: '{ LiteTree }'
    }
  });
}