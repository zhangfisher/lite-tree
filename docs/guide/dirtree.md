# 输出目录树

`@lite-tree/dirtree` 是一个用于输出目录树的工具。


```shell
Usage: index [options] [entry]

Options:
  -V, --version               output the version number
  -i, --ignore <patterns...>  patterns to ignore (default: ["node_modules",".git"])
  -o, --output <path>         output file path (default: "tree.txt")
  -r, --replace <regex...>    two regex patterns to replace content between them in output file if it exists
  -w, --wrap <string...>      two strings to wrap the output content with (default: ["<LiteTree>","</LiteTree>"])
  -s, --sort <type>           sort files by type: name, size, ext (default: "name")
  -g, --glob <pattern>        glob pattern to match files
  -h, --help                  display help for command
```
 

## 安装

```bash
npm install @lite-tree/dirtree
```

## 使用

## 输出

默认情况下会在当前文件夹下输出一个`tree.txt`文件。

通过`-o`可以指定输出文件路径。

## 正则匹配替换

通过`-r`可以指定两个正则表达式，用于替换输出文件中两个正则表达式之间的内容。
使用此功能就可以在输出文件中插入自定义内容。

比如在一个`app.md`文件中。

```md

this is app folder sturture：
-begin-
-after-
```
执行以下命令：

```shell
dirtree -r "-begin-" "-after-"
```

将会在`app.md`文件中插入目录树。此功能非常有用，可以利用脚本在文档中自动更新目录树。

## 提取备注

默认情况下，会自动提取`md/html`文件中的标题作为每一个目录项的备注。

也可以通过`-t`指定一个正则表达式，用于提取文件中的备注。