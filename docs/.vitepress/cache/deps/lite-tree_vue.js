import {
  Fragment,
  createBaseVNode,
  createBlock,
  createCommentVNode,
  createElementBlock,
  createVNode,
  defineComponent,
  h,
  inject,
  normalizeClass,
  normalizeStyle,
  openBlock,
  provide,
  reactive,
  ref,
  renderList,
  resolveComponent,
  toDisplayString,
  unref,
  useSlots,
  withCtx
} from "./chunk-RVDMA4KA.js";

// node_modules/.pnpm/file+_vue@3.4.21/node_modules/lite-tree/dist/vue/index.js
var LiteTreeContextId = Symbol("LiteTreeContext");
var flagAlias = {
  "+": "diff-add",
  "-": "diff-delete",
  "*": "diff-modify",
  "!": "highlight"
};
var addLineCommaRegex = new RegExp("(?<!(\\s*\\,\\s*)|([\\[\\{\\}]\\s*))\\n(?!\\s*\\}\\s*)", "gm");
var strVarRegex = new RegExp(`((?<!\\\\)\\"|\\')(.*?)((?<!\\\\)\\1)`, "gm");
var badKeyRegex = new RegExp('([\\s\\[\\,\\{\\b]{1})(?<!\\"])(\\w+)(?!\\")(\\s*\\:)', "gm");
function safeParseJson(str, callback) {
  try {
    return JSON.parse(str, (key, value) => {
      if (callback) {
        return callback(key, value);
      }
      return value;
    });
  } catch {
  }
  let resultStr = str.replaceAll(addLineCommaRegex, ",\n");
  resultStr = resultStr.replaceAll(strVarRegex, (s, begin, value, end) => {
    return `"${encodeURI(value)}"`;
  });
  resultStr = resultStr.replaceAll(badKeyRegex, (s, p1, value, p2) => {
    return `${p1}"${value}"${p2}`;
  });
  resultStr = resultStr.replaceAll("，", ",").replaceAll("“", '"').replaceAll("”", '"');
  return JSON.parse(resultStr, (key, value) => {
    if (typeof value == "string")
      value = decodeURI(value);
    if (callback) {
      return callback(key, value);
    }
    return value;
  });
}
function parseJson(content, forEach) {
  let nodes = safeParseJson(content.trim(), (key, value) => {
    if (typeof value == "object" && !Array.isArray(value)) {
      value.expend = value.expend == void 0 ? true : value.expend;
      if (value.diff) {
        value.flag = value.diff == "add" ? "+" : value.diff == "delete" ? "-" : value.diff == "modify" ? "*" : value.diff;
        delete value.diff;
      }
      if (!value.flag)
        value.flag = "";
      if (!value.classs)
        value.classs = [];
      if (!value.tags)
        value.tags = [];
      if (!value.style)
        value.style = "";
      if (!value.icon)
        value.icon = "";
      if (!value.comment)
        value.comment = "";
      if (typeof forEach === "function") {
        Object.assign(value, forEach(key, value));
      }
    }
    return value;
  });
  nodes = Array.isArray(nodes) ? nodes : [nodes];
  return nodes;
}
function parseStyleString(str, vars) {
  let style = str;
  if (!style || style.trim().length == 0)
    return { style: "", classs: [] };
  const classList = [];
  const varRegex = new RegExp("(?<!:)(([#\\.]{1}\\w+))\\s*;(?!:)", "g");
  if (!style.trim().endsWith(";"))
    style = style.trim() + ";";
  style = style.replace(varRegex, (matched, key) => {
    if (key in vars) {
      let r = vars[key];
      if (!r.endsWith(";"))
        r = r + ";";
      return r;
    } else if (key.startsWith("#")) {
      return "";
    } else if (matched.startsWith(".")) {
      classList.push(key);
      return "";
    }
    return matched;
  });
  return { style, classs: classList };
}
function StyledString(str, styles) {
  if (typeof str !== "string")
    return { style: "", value: str || "" };
  const styleRegex = /^\{(.*?)\}/g;
  let style = "", classs = [];
  const value = str.replace(styleRegex, (matched, css) => {
    const result = parseStyleString(css, styles);
    style = result.style;
    classs.push(...result.classs);
    return "";
  });
  return { value, style, classs };
}
var nodeRegex = /(\+|\-)?\s*(\[([\w]+?)\])?\s*([^\(\/\\]+)(\((.*?)\))?\s*(\/\/(\S+)?\s*(.*?))?$/gm;
var nodeTagsRegex = /([^,]+)\,?/g;
function parseLiteTree(treeData, vars, options) {
  const opts = Object.assign({ indent: 4 }, options.ltfOptions);
  const lines = treeData.split("\n");
  function parseTags(strTags) {
    if (!strTags)
      return [];
    let matched;
    let tags = [];
    while ((matched = nodeTagsRegex.exec(strTags)) !== null) {
      if (matched.index === nodeTagsRegex.lastIndex) {
        nodeTagsRegex.lastIndex++;
      }
      let tag = matched[1];
      if (tag.startsWith("'") || tag.startsWith('"')) {
        tag = tag.substring(1);
      }
      if (tag.endsWith("'") || tag.endsWith('"')) {
        tag = tag.substring(0, tag.length - 1);
      }
      tags.push(tag);
    }
    return tags;
  }
  function parseNode(line) {
    let node = { expand: false, title: "", tags: [], comment: "", style: "", icon: "", level: 0, flag: "", classs: [] };
    nodeRegex.lastIndex = 0;
    const match = nodeRegex.exec(line.trim());
    if (match) {
      node.expand = match[1] == "+" ? false : true;
      node.icon = match[3] || "";
      node.title = match[4] || "";
      node.tags = parseTags(match[6]);
      node.comment = match[9] || "";
      const flagMatch = /([\w\!\+\*\&\-\=\$\%\@\~\.]+)?(\{[\s\S]*?\})?/g.exec(match[8] || "");
      if (flagMatch) {
        const f = (flagMatch[1] || "").split(".");
        node.flag = f[0];
        const r = parseStyleString(flagMatch[2] || "", vars.styles);
        node.style = r.style;
        node.classs = [...r.classs, ...f.slice(1)];
      }
    }
    return node;
  }
  const preSpace = (lines[0].match(/^\s+/) || [""])[0];
  let previousNode = void 0;
  let parentNode = void 0;
  let rootNode = { level: 0, children: [] };
  const stackNodes = [rootNode];
  for (let line of lines) {
    if (line.trim() == "")
      continue;
    line = line.substring(preSpace.length);
    const node = parseNode(line);
    node.level = Math.ceil((line.match(/^\s+/) || [""])[0].length / opts.indent) + 1;
    if (!previousNode) {
      parentNode = rootNode;
    } else if (node.level == previousNode.level)
      ;
    else if (node.level > previousNode.level) {
      stackNodes.push(previousNode);
      parentNode = previousNode;
    } else if (node.level < previousNode.level) {
      for (let i = stackNodes.length - 1; i >= 0; i--) {
        if (stackNodes[i].level >= node.level) {
          stackNodes.pop();
        } else {
          parentNode = stackNodes[i];
          break;
        }
      }
    }
    if (parentNode && !parentNode.children) {
      parentNode.children = [];
    }
    parentNode == null ? void 0 : parentNode.children.push(node);
    previousNode = node;
    if (typeof options.forEach == "function") {
      options.forEach(node);
    }
  }
  return rootNode.children;
}
var SplitterRegex = /^---\s*$/gm;
function splitTreeContent(context) {
  const results = context.split(SplitterRegex);
  const [vars, treeData] = results.length == 1 ? ["", results[0]] : results;
  return [
    vars.trim(),
    treeData.trim()
  ];
}
function parseVars(str) {
  const styles = {};
  const classs = {};
  const icons2 = {};
  const varRegex = /^\s*([\w\#\.]+)\s*\=\s*((\{([\w\n\S\s]*?)\})|(\<svg[\w\n\S\s]*?<\/svg\>)|(.*$))/gm;
  let matched;
  while ((matched = varRegex.exec(str)) !== null) {
    if (matched.index === varRegex.lastIndex) {
      varRegex.lastIndex++;
    }
    const key = matched[1].trim();
    let value = matched[4] || matched[5] || matched[6];
    if (value.startsWith("<svg") || value.startsWith("data:image/svg+xml;")) {
      icons2[key] = value;
    } else {
      value = value.trim();
      if (value.startsWith("{"))
        value = value.substring(1);
      if (value.endsWith("}"))
        value = value.substring(0, value.length - 1);
      if (key.startsWith(".")) {
        classs[key] = value.replaceAll("\n", ";");
      } else if (key.startsWith("#")) {
        styles[key] = value.replaceAll("\n", ";");
      }
    }
  }
  return { styles, classs, icons: icons2 };
}
function parseTreeObject(strTree, vars, options) {
  let treeData = [];
  try {
    if (options.format == "json") {
      treeData = parseJson(strTree, (key, value) => {
        if (typeof value === "object" && !Array.isArray(value)) {
          if (typeof options.forEach === "function") {
            return options.forEach(value);
          }
        }
      });
    } else {
      treeData = parseLiteTree(strTree, vars, options);
    }
  } catch (e) {
    console.error(e);
    treeData = [{ title: `解析错误:${e.message}`, icon: "error", expand: true, level: 0, flag: "", classs: [""], comment: e.message, style: "", tags: [] }];
  }
  return treeData;
}
function parseTree(context, options) {
  const opts = Object.assign({}, options);
  const [strVars, strTree] = splitTreeContent(context);
  const vars = parseVars(strVars);
  const nodes = parseTreeObject(strTree, vars, opts);
  return {
    ...vars,
    nodes
  };
}
var _hoisted_1$2 = ["innerHTML"];
var __default__$1 = {};
var _sfc_main$2 = defineComponent({
  ...__default__$1,
  __name: "RichLabel",
  props: {
    value: {
      type: String,
      default: ""
    }
  },
  setup(__props) {
    const props = __props;
    const treeCtx = inject(LiteTreeContextId);
    const styled = StyledString(props.value, treeCtx.styles);
    const parseLinks = (content) => {
      const regex = /\[([^\[\]]*?)(\:(\w+))?\]\((([^\(\\\s)]+)(\s+[\w\u4e00-\u9fa5\w]+)?)\)/g;
      const result = content.replace(regex, (matched, label, _1, icon, _2, link, tips) => {
        return `<a style='display:inline-flex;align-items:center;' ${tips ? "title=" + tips : ""} class='action' target='_blank' href='${link}'>${icon ? `<span class='icon ${icon}'></span>` : ""}${label}</a>`;
      });
      return result;
    };
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("span", {
        style: normalizeStyle(unref(styled).style),
        class: normalizeClass(unref(styled).classs),
        innerHTML: parseLinks(unref(styled).value)
      }, null, 14, _hoisted_1$2);
    };
  }
});
var SlideUpDown = {
  name: "SlideUpDown",
  props: {
    active: Boolean,
    duration: {
      type: Number,
      default: 500
    },
    tag: {
      type: String,
      default: "div"
    },
    useHidden: {
      type: Boolean,
      default: true
    }
  },
  data: () => ({
    style: {},
    initial: false,
    hidden: false
  }),
  watch: {
    active() {
      this.layout();
    }
  },
  render() {
    return h(
      this.tag,
      {
        ...this.attrs,
        style: this.style,
        ref: "container",
        onTransitionend: this.onTransitionEnd
      },
      this.$slots.default()
    );
  },
  mounted() {
    this.layout();
    this.initial = true;
  },
  created() {
    this.hidden = !this.active;
  },
  computed: {
    el() {
      return this.$refs.container;
    },
    attrs() {
      const attrs = {
        "aria-hidden": !this.active,
        "aria-expanded": this.active
      };
      if (this.useHidden) {
        attrs.hidden = this.hidden;
      }
      return attrs;
    }
  },
  methods: {
    layout() {
      if (this.active) {
        this.hidden = false;
        this.$emit("open-start");
        if (this.initial) {
          this.setHeight("0px", () => this.el.scrollHeight + "px");
        }
      } else {
        this.$emit("close-start");
        this.setHeight(this.el.scrollHeight + "px", () => "0px");
      }
    },
    asap(callback) {
      if (!this.initial) {
        callback();
      } else {
        this.$nextTick(callback);
      }
    },
    setHeight(temp, afterRelayout) {
      this.style = { height: temp };
      this.asap(() => {
        this.__ = this.el.scrollHeight;
        this.style = {
          height: afterRelayout(),
          overflow: "hidden",
          "transition-property": "height",
          "transition-duration": this.duration + "ms"
        };
      });
    },
    onTransitionEnd(event) {
      if (event.target !== this.el)
        return;
      if (this.active) {
        this.style = {};
        this.$emit("open-end");
      } else {
        this.style = {
          height: "0",
          overflow: "hidden"
        };
        this.hidden = true;
        this.$emit("close-end");
      }
    }
  }
};
var _hoisted_1$1 = {
  class: normalizeClass(["lite-tree-nodes"])
};
var _hoisted_2 = ["onClick"];
var _hoisted_3 = {
  key: 0,
  class: "flag"
};
var _hoisted_4 = { class: "title" };
var __default__ = {};
var _sfc_main$1 = defineComponent({
  ...__default__,
  __name: "LiteTreeNodes",
  props: {
    indent: { default: 0 },
    nodes: { default: () => [] }
  },
  setup(__props) {
    const $insertStylesheet = (id, css) => {
      let style = document.getElementById("hom0txe");
      if (!style) {
        style = document.createElement("style");
        style.id = "hom0txe";
        document.head.appendChild(style);
        style.innerHTML = css;
      }
    };
    $insertStylesheet("hom0txe", `
.lite-tree-nodes[data-v-hom0txe]{
  color: #555;
  display: flex;
  flex-direction: column;
  list-style: none !important;
  padding: 0px;
}
.lite-tree-nodes > li > span.lite-tree-node[data-v-hom0txe]{
  cursor: pointer;
  display: flex;
  width: 100%;
  padding: 4px;
  margin: 0px;
  align-items: center;
  position: relative;
}
.lite-tree-nodes > li > span.lite-tree-node.diff-add[data-v-hom0txe]{
  background-color: #f3ffec;
  color: green;
}
.lite-tree-nodes > li > span.lite-tree-node.diff-modify[data-v-hom0txe]{
  background-color: #fff6e9;
  color: orange;
}
.lite-tree-nodes > li > span.lite-tree-node.diff-delete[data-v-hom0txe]{
  background-color: #ffeaea;
  color: red;
}
.lite-tree-nodes > li > span.lite-tree-node.highlight[data-v-hom0txe]{
  background-color: #eee;
  color: black;
  font-weight: bold;
}
.lite-tree-nodes > li > span.lite-tree-node > span.flag[data-v-hom0txe]{
  width: 24px;
  text-align: center;
}
.lite-tree-nodes > li > span.lite-tree-node > span.title[data-v-hom0txe]{
  flex-grow: 1;
  padding-right: 4px;
}
.lite-tree-nodes > li > span.lite-tree-node > span.title > span.tag[data-v-hom0txe]{
  background-color: #eee;
  color: #333;
  padding: 2px 4px;
  border-radius: 4px;
  border: 1px solid #ddd;
  margin-left: 2px;
  margin-right: 2px;
  font-size: 12px;
}
.lite-tree-nodes > li > span.lite-tree-node > span.comment[data-v-hom0txe]{
  color: #bbb;
}
.lite-tree-nodes > li > span.lite-tree-node > span.node-indicator[data-v-hom0txe]{
  width: 1em;
  height: 1em;
  transform-origin: 10px center;
  transform: rotate(0deg);
  transition: all 0.2s;
}
.lite-tree-nodes > li > span.lite-tree-node > span.node-indicator.expand[data-v-hom0txe]{
  transform-origin: 10px center;
  transform: rotate(90deg);
  transition: all 0.2s;
}
.lite-tree-nodes > li > span.lite-tree-node[data-v-hom0txe]:hover{
  background-color: #f8f8f8;
  border-radius: 4px;
}
`);
    const treeCtx = inject(LiteTreeContextId);
    const toggleNode = (node) => {
      node.expand = node.expand == void 0 ? false : !node.expand;
    };
    const hasChildren = (node) => {
      return Array.isArray(node.children) && node.children.length > 0;
    };
    const isExpand = (node) => {
      return node.expand == void 0 ? true : node.expand;
    };
    return (_ctx, _cache) => {
      const _component_LiteTreeNodes = resolveComponent("LiteTreeNodes", true);
      return openBlock(), createElementBlock("ul", _hoisted_1$1, [
        (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.nodes, (node, index2) => {
          return openBlock(), createElementBlock("li", { key: index2 }, [
            createBaseVNode("span", {
              class: normalizeClass(["lite-tree-node", node.classs]),
              onClick: ($event) => toggleNode(node),
              style: normalizeStyle(node.style)
            }, [
              unref(treeCtx).hasFlag ? (openBlock(), createElementBlock("span", _hoisted_3, toDisplayString(node.flag), 1)) : createCommentVNode("", true),
              createBaseVNode("span", {
                class: "indent",
                style: normalizeStyle({ width: _ctx.indent + "px" })
              }, null, 4),
              hasChildren(node) ? (openBlock(), createElementBlock("span", {
                key: 1,
                class: normalizeClass([
                  "node-indicator",
                  "icon",
                  "arrow",
                  { expand: isExpand(node) }
                ])
              }, null, 2)) : createCommentVNode("", true),
              createBaseVNode("span", {
                class: normalizeClass(["icon", node.icon ? node.icon : hasChildren(node) ? isExpand(node) ? "folder-open" : "folder" : "file"])
              }, null, 2),
              createBaseVNode("span", _hoisted_4, [
                createVNode(_sfc_main$2, {
                  value: node.title
                }, null, 8, ["value"]),
                (openBlock(true), createElementBlock(Fragment, null, renderList(node.tags, (tag) => {
                  return openBlock(), createBlock(_sfc_main$2, {
                    class: "tag",
                    key: tag,
                    value: tag
                  }, null, 8, ["value"]);
                }), 128))
              ]),
              createVNode(_sfc_main$2, {
                class: "comment",
                value: node.comment
              }, null, 8, ["value"])
            ], 14, _hoisted_2),
            createVNode(unref(SlideUpDown), {
              active: isExpand(node),
              duration: 200
            }, {
              default: withCtx(() => [
                hasChildren(node) && isExpand(node) ? (openBlock(), createBlock(_component_LiteTreeNodes, {
                  key: 0,
                  indent: _ctx.indent + 20,
                  class: normalizeClass(isExpand(node) ? "expand" : "close"),
                  nodes: node.children
                }, null, 8, ["indent", "class", "nodes"])) : createCommentVNode("", true)
              ]),
              _: 2
            }, 1032, ["active"])
          ]);
        }), 128))
      ]);
    };
  }
});
var _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};
var LiteTreeNodes = _export_sfc(_sfc_main$1, [["__scopeId", "data-v-7b5f0052"]]);
function injectStylesheet(css, options) {
  const { id, mode } = Object.assign({ mode: "replace" }, options);
  let style = document.head.querySelector(`#${id}`);
  if (!style) {
    style = document.createElement("style");
    style.innerHTML = css;
    style.id = id;
    document.head.appendChild(style);
    return style;
  }
  if (mode == "replace") {
    style.innerHTML = css;
  } else {
    style.innerHTML += css;
  }
  return style;
}
function enableImportant(css) {
  return css.replace(/(.*?)(\s*;)/g, (matched, p1, p2) => {
    if (p1.trim().endsWith("!important"))
      return matched;
    return p1.trim() + "!important;";
  });
}
var icons = {
  file: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxZW0iIGhlaWdodD0iMWVtIiB2aWV3Qm94PSIwIDAgMzIgMzIiPjxwYXRoIGZpbGw9ImN1cnJlbnRDb2xvciIgZD0ibTI1LjcgOS4zbC03LTdjLS4yLS4yLS40LS4zLS43LS4zSDhjLTEuMSAwLTIgLjktMiAydjI0YzAgMS4xLjkgMiAyIDJoMTZjMS4xIDAgMi0uOSAyLTJWMTBjMC0uMy0uMS0uNS0uMy0uN3pNMTggNC40bDUuNiA1LjZIMThWNC40ek0yNCAyOEg4VjRoOHY2YzAgMS4xLjkgMiAyIDJoNnYxNnoiLz48cGF0aCBmaWxsPSJjdXJyZW50Q29sb3IiIGQ9Ik0xMCAyMmgxMnYySDEwem0wLTZoMTJ2MkgxMHoiLz48L3N2Zz4=",
  folder: `data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxZW0iIGhlaWdodD0iMWVtIiB2aWV3Qm94PSIwIDAgMjQgMjQiPjxwYXRoIGZpbGw9Im5vbmUiIHN0cm9rZT0iY3VycmVudENvbG9yIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIHN0cm9rZS13aWR0aD0iMiIgZD0iTTUgNGg0bDMgM2g3YTIgMiAwIDAgMSAyIDJ2OGEyIDIgMCAwIDEtMiAySDVhMiAyIDAgMCAxLTItMlY2YTIgMiAwIDAgMSAyLTIiLz48L3N2Zz4=`,
  "folder-open": `data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxZW0iIGhlaWdodD0iMWVtIiB2aWV3Qm94PSIwIDAgMjQgMjQiPjxwYXRoIGZpbGw9Im5vbmUiIHN0cm9rZT0iY3VycmVudENvbG9yIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIHN0cm9rZS13aWR0aD0iMiIgZD0ibTUgMTlsMi43NTctNy4zNTFBMSAxIDAgMCAxIDguNjkzIDExSDIxYTEgMSAwIDAgMSAuOTg2IDEuMTY0bC0uOTk2IDUuMjExQTIgMiAwIDAgMSAxOS4wMjYgMTl6YTIgMiAwIDAgMS0yLTJWNmEyIDIgMCAwIDEgMi0yaDRsMyAzaDdhMiAyIDAgMCAxIDIgMnYyIi8+PC9zdmc+`,
  arrow: `data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxZW0iIGhlaWdodD0iMWVtIiB2aWV3Qm94PSIwIDAgMzIgMzIiPjxwYXRoIGZpbGw9IiNhYmFiYWIiIGQ9Im0xMiA4bDEwIDhsLTEwIDh6Ii8+PC9zdmc+`,
  tag: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxZW0iIGhlaWdodD0iMWVtIiB2aWV3Qm94PSIwIDAgMzIgMzIiPjxwYXRoIGZpbGw9ImN1cnJlbnRDb2xvciIgZD0iTTEwIDE0YTQgNCAwIDEgMSA0LTRhNC4wMDUgNC4wMDUgMCAwIDEtNCA0Wm0wLTZhMiAyIDAgMSAwIDEuOTk4IDIuMDA0QTIuMDAyIDIuMDAyIDAgMCAwIDEwIDhaIi8+PHBhdGggZmlsbD0iY3VycmVudENvbG9yIiBkPSJNMTYuNjQ0IDI5LjQxNUwyLjU4NiAxNS4zNTRBMiAyIDAgMCAxIDIgMTMuOTQxVjRhMiAyIDAgMCAxIDItMmg5Ljk0MWEyIDIgMCAwIDEgMS40MTQuNTg2bDE0LjA2IDE0LjA1OGEyIDIgMCAwIDEgMCAyLjgyOGwtOS45NDMgOS45NDNhMiAyIDAgMCAxLTIuODI5IDBaTTQgNHY5Ljk0MkwxOC4wNTggMjhMMjggMTguMDU4TDEzLjk0MiA0WiIvPjwvc3ZnPg==",
  checked: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxZW0iIGhlaWdodD0iMWVtIiB2aWV3Qm94PSIwIDAgMjEgMjEiPjxnIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCIgc3Ryb2tlPSJjdXJyZW50Q29sb3IiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCI+PHBhdGggZD0iTTUuNSAzLjVoMTBhMiAyIDAgMCAxIDIgMnYxMGEyIDIgMCAwIDEtMiAyaC0xMGEyIDIgMCAwIDEtMi0ydi0xMGEyIDIgMCAwIDEgMi0yIi8+PHBhdGggZD0ibTcuNSAxMC41bDIgMmw0LTQiLz48L2c+PC9zdmc+",
  unchecked: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxZW0iIGhlaWdodD0iMWVtIiB2aWV3Qm94PSIwIDAgMjEgMjEiPjxwYXRoIGZpbGw9Im5vbmUiIHN0cm9rZT0iY3VycmVudENvbG9yIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGQ9Ik01LjUgMy41aDEwYTIgMiAwIDAgMSAyIDJ2MTBhMiAyIDAgMCAxLTIgMmgtMTBhMiAyIDAgMCAxLTItMnYtMTBhMiAyIDAgMCAxIDItMiIvPjwvc3ZnPg==",
  star: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxZW0iIGhlaWdodD0iMWVtIiB2aWV3Qm94PSIwIDAgMjQgMjQiPjxwYXRoIGZpbGw9ImN1cnJlbnRDb2xvciIgZD0ibTIyIDkuMjRsLTcuMTktLjYyTDEyIDJMOS4xOSA4LjYzTDIgOS4yNGw1LjQ2IDQuNzNMNS44MiAyMUwxMiAxNy4yN0wxOC4xOCAyMWwtMS42My03LjAzek0xMiAxNS40bC0zLjc2IDIuMjdsMS00LjI4bC0zLjMyLTIuODhsNC4zOC0uMzhMMTIgNi4xbDEuNzEgNC4wNGw0LjM4LjM4bC0zLjMyIDIuODhsMSA0LjI4eiIvPjwvc3ZnPg=="
};
function getSvgIconContainer() {
  let svgContainer = document.querySelector("#lite_tree_icons");
  if (!svgContainer) {
    svgContainer = document.createElement("style");
    svgContainer.id = "lite_tree_icons";
    svgContainer.innerHTML = `.lite-tree .icon{
            display:inline-block;
            width:1em;
            height:1em;
            margin:0.2em;
        }`;
    document.head.appendChild(svgContainer);
  }
  return svgContainer;
}
var compressRegex = /(\<\?xml(.*)?\?\>)|(\<\!DOCTYPE.*?\>)|(width\=\"\d+\"\s?)|(height\=\"\d+\"\s?)|(\bxmlns(\:\w+)?\=\".*?\"\s?)|(p\-id\=\"\d+\"\s?)|(t\=\"\d+\"\s?)|(version\=\".*?\"\s?)|(class\=\"\w+\"\s?)/gm;
function compressSvgData(svgData) {
  return svgData.replace(compressRegex, "");
}
function injectSvgIcons(svgIcons) {
  const svgIconContainer = getSvgIconContainer();
  for (let [name, define] of Object.entries({ ...svgIcons, ...icons })) {
    const iconClassName = `.icon.${name}`;
    const isSvg = define.startsWith("<svg");
    const svgData = isSvg ? compressSvgData(define).replaceAll("<", "%3C").replaceAll(">", "%3E").replaceAll('"', "'") : define;
    const iconStyle = `.lite-tree ${iconClassName}{
            background-color: currentColor;
            mask-image: url("${isSvg ? `data:image/svg+xml,${svgData}` : svgData}");            
        }`;
    if (svgIconContainer.innerHTML.includes(`.lite-tree ${iconClassName}`))
      continue;
    svgIconContainer.innerHTML = svgIconContainer.innerHTML + "\n" + iconStyle;
  }
}
var _hoisted_1 = { class: "lite-tree" };
var _sfc_main = defineComponent({
  __name: "index",
  props: {
    indent: { default: 4 },
    format: { default: "lite" },
    iconset: { default: () => ["folder", "file"] }
  },
  setup(__props) {
    const $insertStylesheet = (id, css) => {
      let style = document.getElementById("hroaqb5");
      if (!style) {
        style = document.createElement("style");
        style.id = "hroaqb5";
        document.head.appendChild(style);
        style.innerHTML = css;
      }
    };
    $insertStylesheet("hroaqb5", `
.lite-tree[data-v-hroaqb5]{
  position: relative;
  padding: 8px;
  border: 1px solid #eee;
  text-align: left;
}
`);
    const props = __props;
    const hasError = ref(false);
    const hasFlag = ref(false);
    const slots = useSlots();
    const parseSlotData = () => {
      var _a;
      const slotContent = (_a = slots.default) == null ? void 0 : _a.call(slots)[0];
      if (slotContent && typeof slotContent.children === "string") {
        try {
          return parseTree(slotContent.children, {
            format: props.format,
            forEach: (node) => {
              const flag = node.flag;
              if (flag && flag.length > 0) {
                hasFlag.value = true;
                if (flag in flagAlias) {
                  node.classs.push(flagAlias[flag]);
                }
              }
            }
          });
        } catch (error) {
          hasError.value = true;
          console.error(error);
          nodes = [{
            title: "Invalid data provided to LiteTree",
            style: "color:red",
            // @ts-ignore
            children: [{ title: error.message, style: "color:red" }]
          }];
        }
        return { classs: {}, styles: {}, icons: {}, nodes: [] };
      } else {
        return { classs: {}, styles: {}, icons: {}, nodes: [] };
      }
    };
    const injectCustomStyles = (classs2) => {
      injectStylesheet(`        
        ${Object.keys(classs2).map((k) => `.lite-tree ${k} { ${enableImportant(classs2[k])} }`).join("\n")} 
    `, { id: "lite-tree-custom-styles", mode: "replace" });
    };
    const { nodes: rNodes, styles, classs, icons: icons2 } = parseSlotData();
    injectCustomStyles(classs);
    injectSvgIcons(icons2);
    let nodes = reactive(rNodes);
    provide(LiteTreeContextId, {
      hasFlag: hasFlag.value,
      indent: props.indent,
      styles,
      classs,
      icons: icons2
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1, [
        createVNode(LiteTreeNodes, { nodes: unref(nodes) }, null, 8, ["nodes"])
      ]);
    };
  }
});
var index = _export_sfc(_sfc_main, [["__scopeId", "data-v-779d4b92"]]);
export {
  index as default
};
//# sourceMappingURL=lite-tree_vue.js.map
