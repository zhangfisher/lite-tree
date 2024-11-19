const fs = require('fs');
const path = require('path');
const glob = require('glob');
const commander = require('commander');

const program = new commander.Command();


/**
 * 判定一个文件是否是文本文件
 * 
 * 1. 排除二进制文件
 * 2. 排除图片文件
 * 3. 排除音视频文件
 * 4. 排除压缩文件
 * 5. 排除可执行文件,通过文件属性来判定
 * 
 * @param {*} filePath 
 */

function isTextFile(filePath){
    const ext = path.extname(filePath).toLowerCase();
    const noTextExts = [
        // 二进制文件
        '.exe', '.dll', '.bin', '.dat', '.class', '.so',
        // 图片文件
        '.jpg', '.jpeg', '.png', '.gif', '.bmp', '.tiff', '.ico', '.svg',
        // 音视频文件
        '.mp3', '.wav', '.wma', '.aac', '.flac', '.ogg', '.mp4', '.avi', '.mkv', '.mov', '.wmv', '.flv',
        // 压缩文件
        '.zip', '.rar', '.tar', '.gz', '.7z', '.bz2',
        // 可执行文件
        '.exe', '.msi', '.bat', '.sh'
    ];

    // 如果文件扩展名在排除列表中，则不是文本文件
    if (noTextExts.includes(ext)) {
        return false;
    }

    // 进一步检查文件内容是否为文本
    const buffer = fs.readFileSync(filePath);
    for (let i = 0; i < buffer.length; i++) {
        if (buffer[i] === 0) {
            return false; // 二进制文件通常包含 null 字节
        }
    }
    return true;    
}

function getString(str){
    if(!str) return str
    if((str.startsWith('"') && str.endsWith('"'))
       || (str.startsWith("'") && str.endsWith("'"))
    ){
        return str.substring(1, str.length - 1);
    }
    return str;
}

program
  .version('1.0.0')
  .name('dirtree')
  .arguments('[entry]')
  .option('-i, --ignore <patterns...>', 'patterns to ignore', ['node_modules', '.git'])
  .option('-o, --output <path>', 'output file path', 'tree.txt')
  .option('-t, --title <regex>', 'Pick title from file content using regex')
  .option('-r, --replace <regex...>', 'two regex patterns to replace content between them in output file if it exists')
  .option('-w, --wrap <string...>', 'two strings to wrap the output content with', ['<LiteTree>', '</LiteTree>'])
  .option('-s, --sort <type>', 'sort files by type: name, size, ext', 'name')
  .option('-g, --glob <pattern>', 'glob pattern to match files')
  .action((entry,options) => {
    const entryPath = entry ? path.resolve(entry) : process.cwd();
    const ignorePatterns = (options.ignore || []).map(s=>getString(s));
    const outputPath = path.resolve(options.output);
    const titlePattern = options.title ? new RegExp(getString(options.title)) : null;
    const replacePattern1 = options.replace ? new RegExp(getString(options.replace[0]), 'g') : null;
    const replacePattern2 = options.replace ? new RegExp(getString(options.replace[1]), 'g') : null;
    const wrapStrings = options.wrap || ['<LiteTree>', '</LiteTree>'];
    const sortType = options.sort;
    const globPattern = getString(options.glob);

    function getTitle(filePath) {
        if(!isTextFile(filePath)) return ''
      const ext = path.extname(filePath);
      const content = fs.readFileSync(filePath, 'utf-8');
      if (titlePattern) {
        const match = content.match(titlePattern);
        return match ? match[1] : '';
      }else if (ext === '.md') {
        const match = content.match(/^#\s+(.*)/m);
        return match ? match[1] : '';
      } else if (ext === '.html' || ext === '.htm') {
        const match = content.match(/<title>(.*?)<\/title>/i);
        return match ? match[1] : '';
      }
      return '';
    }

    function sortFiles(files, dir) {
      return files.sort((a, b) => {
        const filePathA = path.join(dir, a);
        const filePathB = path.join(dir, b);
        const statsA = fs.statSync(filePathA);
        const statsB = fs.statSync(filePathB);

        if (sortType === 'size') {
          return statsA.size - statsB.size;
        } else if (sortType === 'ext') {
          return path.extname(a).localeCompare(path.extname(b));
        } else {
          return a.localeCompare(b);
        }
      });
    }

    function traverseDir(dir, indent = '') {
      let files = fs.readdirSync(dir);
      files = sortFiles(files, dir);
      files.forEach(file => {
        const filePath = path.join(dir, file);
        const relativePath = path.relative(entryPath, filePath);
        if (ignorePatterns.some(pattern => relativePath.includes(pattern))) {
          return;
        }
        const stats = fs.statSync(filePath);
        if (stats.isDirectory()) {
          if (file !== '.' && file !== '..') {
            const line = `${indent}${file}/`;
            console.log(line);
            outputContent += line + '\n';
            traverseDir(filePath, indent + '    ');
          }
        } else {
          if (globPattern && !glob.sync(globPattern, { cwd: dir }).includes(file)) {
            return;
          }
          const title = getTitle(filePath);
          const line = `${indent}${file}`;
          const paddedLine = line.padEnd(60, ' ');
          const outputLine = `${paddedLine}${title ? `// ${title}` : ''}`;
          console.log(outputLine);
          outputContent += outputLine + '\n';
        }
      });
    }

    let outputContent = '';
    traverseDir(entryPath);

    outputContent = wrapStrings[0] + '\n' + outputContent + wrapStrings[1] + '\n';

    if (fs.existsSync(outputPath) && replacePattern1 && replacePattern2) {
        const existingContent = fs.readFileSync(outputPath, 'utf-8');
        const lines = existingContent.split('\n');
        let startIndex = -1;
        let endIndex = -1;
  
        for (let i = 0; i < lines.length; i++) {
          if (startIndex === -1 && replacePattern1.test(lines[i])) {
            startIndex = i + 1;
          }
          if (startIndex !== -1 && replacePattern2.test(lines[i])) {
            endIndex = i ;
            break;
          }
        }
  
        if (startIndex !== -1 && endIndex !== -1) {
          const newContent = [
            ...lines.slice(0, startIndex),
            outputContent,
            ...lines.slice(endIndex)
          ].join('\n');
          fs.writeFileSync(outputPath, newContent);
        } else {
          fs.writeFileSync(outputPath, outputContent);
        }
    } else {
      fs.writeFileSync(outputPath, outputContent);
    }
  })
  .parse(process.argv);