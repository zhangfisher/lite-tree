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
var N = Symbol("LiteTreeContext");
var H = {
  "+": "diff-add",
  "-": "diff-delete",
  "*": "diff-modify",
  "!": "highlight"
};
var Q = new RegExp("(?<!(\\s*\\,\\s*)|([\\[\\{\\}]\\s*))\\n(?!\\s*\\}\\s*)", "gm");
var Y = new RegExp(`((?<!\\\\)\\"|\\')(.*?)((?<!\\\\)\\1)`, "gm");
var J = new RegExp('([\\s\\[\\,\\{\\b]{1})(?<!\\"])(\\w+)(?!\\")(\\s*\\:)', "gm");
function U(i, n) {
  try {
    return JSON.parse(i, (s, e) => n ? n(s, e) : e);
  } catch {
  }
  let t = i.replaceAll(Q, `,
`);
  return t = t.replaceAll(Y, (s, e, l, r) => `"${encodeURI(l)}"`), t = t.replaceAll(J, (s, e, l, r) => `${e}"${l}"${r}`), t = t.replaceAll("，", ",").replaceAll("“", '"').replaceAll("”", '"'), JSON.parse(t, (s, e) => (typeof e == "string" && (e = decodeURI(e)), n ? n(s, e) : e));
}
function X(i, n) {
  let t = U(i.trim(), (s, e) => (typeof e == "object" && !Array.isArray(e) && (e.expend = e.expend == null ? true : e.expend, e.diff && (e.flag = e.diff == "add" ? "+" : e.diff == "delete" ? "-" : e.diff == "modify" ? "*" : e.diff, delete e.diff), e.flag || (e.flag = ""), e.classs || (e.classs = []), e.tags || (e.tags = []), e.style || (e.style = ""), e.icon || (e.icon = ""), e.comment || (e.comment = ""), typeof n == "function" && Object.assign(e, n(s, e))), e));
  return t = Array.isArray(t) ? t : [t], t;
}
function F(i, n) {
  const { id: t, mode: s } = Object.assign({ mode: "replace" }, n);
  let e = document.head.querySelector(`#${t}`);
  return e ? (s == "replace" ? e.innerHTML = i : e.innerHTML += i, e) : (e = document.createElement("style"), e.innerHTML = i, e.id = t, document.head.appendChild(e), e);
}
function q(i) {
  return i.replace(/(.*?)(\s*;)/g, (n, t, s) => t.trim().endsWith("!important") ? n : t.trim() + "!important;");
}
function _(i, n) {
  let t = i;
  if (!t || t.trim().length == 0)
    return { style: "", classs: [] };
  const s = [], e = new RegExp("(?<!:)(([#\\.]{1}\\w+))\\s*;(?!:)", "g");
  return t.trim().endsWith(";") || (t = t.trim() + ";"), t = t.replace(e, (l, r) => {
    if (r in n) {
      let c = n[r];
      return c.endsWith(";") || (c = c + ";"), c;
    } else {
      if (r.startsWith("#"))
        return "";
      if (l.startsWith("."))
        return s.push(r), "";
    }
    return l;
  }), { style: t, classs: s };
}
function K(i, n) {
  if (typeof i != "string")
    return { style: "", value: i || "" };
  const t = /^\{(.*?)\}/g;
  let s = "", e = [];
  return { value: i.replace(t, (r, c) => {
    const m = _(c, n);
    return s = m.style, e.push(...m.classs), "";
  }), style: s, classs: e };
}
var E = /(\+|\-)?\s*(\[([\w]+?)\])?\s*([^\(\/\\]+)(\((.*?)\))?\s*(\/\/(\S+)?\s*(.*?))?$/gm;
var v = /([^,]+)\,?/g;
function ee(i, n, t) {
  const s = Object.assign({ indent: 4 }, t.ltfOptions), e = i.split(`
`);
  function l(I) {
    if (!I)
      return [];
    let a, d = [];
    for (; (a = v.exec(I)) !== null; ) {
      a.index === v.lastIndex && v.lastIndex++;
      let g = a[1];
      (g.startsWith("'") || g.startsWith('"')) && (g = g.substring(1)), (g.endsWith("'") || g.endsWith('"')) && (g = g.substring(0, g.length - 1)), d.push(g);
    }
    return d;
  }
  function r(I) {
    let a = { expand: false, title: "", tags: [], comment: "", style: "", icon: "", level: 0, flag: "", classs: [] };
    E.lastIndex = 0;
    const d = E.exec(I.trim());
    if (d) {
      a.expand = d[1] != "+", a.icon = d[3] || "", a.title = d[4] || "", a.tags = l(d[6]), a.comment = d[9] || "";
      const g = /([\w\!\+\*\&\-\=\$\%\@\~\.]+)?(\{[\s\S]*?\})?/g.exec(d[8] || "");
      if (g) {
        const M = (g[1] || "").split(".");
        a.flag = M[0];
        const j = _(g[2] || "", n.styles);
        a.style = j.style, a.classs = [...j.classs, ...M.slice(1)];
      }
    }
    return a;
  }
  const c = (e[0].match(/^\s+/) || [""])[0];
  let m, o, f = { level: 0, children: [] };
  const h2 = [f];
  for (let I of e) {
    if (I.trim() == "")
      continue;
    I = I.substring(c.length);
    const a = r(I);
    if (a.level = Math.ceil((I.match(/^\s+/) || [""])[0].length / s.indent) + 1, !m)
      o = f;
    else if (a.level != m.level) {
      if (a.level > m.level)
        h2.push(m), o = m;
      else if (a.level < m.level)
        for (let d = h2.length - 1; d >= 0; d--)
          if (h2[d].level >= a.level)
            h2.pop();
          else {
            o = h2[d];
            break;
          }
    }
    o && !o.children && (o.children = []), o == null || o.children.push(a), m = a, typeof t.forEach == "function" && t.forEach(a);
  }
  return f.children;
}
var te = /^---\s*$/gm;
function ie(i) {
  const n = i.split(te), [t, s] = n.length == 1 ? ["", n[0]] : n;
  return [
    t.trim(),
    s.trim()
  ];
}
function se(i) {
  const n = {}, t = {}, s = {}, e = /^\s*([\w\#\.]+)\s*\=\s*((\{([\w\n\S\s]*?)\})|(\<svg[\w\n\S\s]*?<\/svg\>)|(.*$))/gm;
  let l;
  for (; (l = e.exec(i)) !== null; ) {
    l.index === e.lastIndex && e.lastIndex++;
    const r = l[1].trim();
    let c = l[4] || l[5] || l[6];
    c.startsWith("<svg") || c.startsWith("data:image/svg+xml;") ? s[r] = c : (c = c.trim(), c.startsWith("{") && (c = c.substring(1)), c.endsWith("}") && (c = c.substring(0, c.length - 1)), r.startsWith(".") ? t[r] = c.replaceAll(`
`, ";") : r.startsWith("#") && (n[r] = c.replaceAll(`
`, ";")));
  }
  return { styles: n, classs: t, icons: s };
}
function ne(i, n, t) {
  let s = [];
  try {
    t.format == "json" ? s = X(i, (e, l) => {
      if (typeof l == "object" && !Array.isArray(l) && typeof t.forEach == "function")
        return t.forEach(l);
    }) : s = ee(i, n, t);
  } catch (e) {
    console.error(e), s = [{ title: `解析错误:${e.message}`, icon: "error", expand: true, level: 0, flag: "", classs: [""], comment: e.message, style: "", tags: [] }];
  }
  return s;
}
function re(i, n) {
  const t = Object.assign({}, n), [s, e] = ie(i), l = se(s), r = ne(e, l, t);
  return {
    ...l,
    nodes: r
  };
}
var le = ["innerHTML"];
var ae = {};
var w = defineComponent({
  ...ae,
  __name: "RichLabel",
  props: {
    value: {
      type: String,
      default: ""
    }
  },
  setup(i) {
    const n = i, t = inject(N), s = K(n.value, t.styles), e = (l) => {
      const r = /\[([^\[\]]*?)(\:(\w+))?\]\((([^\(\\\s)]+)(\s+[\w\u4e00-\u9fa5\w]+)?)\)/g;
      return l.replace(r, (m, o, f, h2, I, a, d) => `<a style='display:inline-flex;align-items:center;' ${d ? "title=" + d : ""} class='action' target='_blank' href='${a}'>${h2 ? `<span class='icon ${h2}'></span>` : ""}${o}</a>`);
    };
    return (l, r) => (openBlock(), createElementBlock("span", {
      style: normalizeStyle(unref(s).style),
      class: normalizeClass(unref(s).classs),
      innerHTML: e(unref(s).value)
    }, null, 14, le));
  }
});
var oe = {
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
    this.layout(), this.initial = true;
  },
  created() {
    this.hidden = !this.active;
  },
  computed: {
    el() {
      return this.$refs.container;
    },
    attrs() {
      const i = {
        "aria-hidden": !this.active,
        "aria-expanded": this.active
      };
      return this.useHidden && (i.hidden = this.hidden), i;
    }
  },
  methods: {
    layout() {
      this.active ? (this.hidden = false, this.$emit("open-start"), this.initial && this.setHeight("0px", () => this.el.scrollHeight + "px")) : (this.$emit("close-start"), this.setHeight(this.el.scrollHeight + "px", () => "0px"));
    },
    asap(i) {
      this.initial ? this.$nextTick(i) : i();
    },
    setHeight(i, n) {
      this.style = { height: i }, this.asap(() => {
        this.__ = this.el.scrollHeight, this.style = {
          height: n(),
          overflow: "hidden",
          "transition-property": "height",
          "transition-duration": this.duration + "ms"
        };
      });
    },
    onTransitionEnd(i) {
      i.target === this.el && (this.active ? (this.style = {}, this.$emit("open-end")) : (this.style = {
        height: "0",
        overflow: "hidden"
      }, this.hidden = true, this.$emit("close-end")));
    }
  }
};
var ce = {
  class: normalizeClass(["lite-tree-nodes"])
};
var de = ["onClick"];
var ge = {
  key: 0,
  class: "flag"
};
var me = { class: "title" };
var he = {};
var Ie = defineComponent({
  ...he,
  __name: "LiteTreeNodes",
  props: {
    indent: { default: 0 },
    nodes: { default: () => [] }
  },
  setup(i) {
    ((r, c) => {
      let m = document.getElementById("hom0txe");
      m || (m = document.createElement("style"), m.id = "hom0txe", document.head.appendChild(m), m.innerHTML = c);
    })("hom0txe", `
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
    const t = inject(N), s = (r) => {
      r.expand = r.expand == null ? false : !r.expand;
    }, e = (r) => Array.isArray(r.children) && r.children.length > 0, l = (r) => r.expand == null ? true : r.expand;
    return (r, c) => {
      const m = resolveComponent("LiteTreeNodes", true);
      return openBlock(), createElementBlock("ul", ce, [
        (openBlock(true), createElementBlock(Fragment, null, renderList(r.nodes, (o, f) => (openBlock(), createElementBlock("li", { key: f }, [
          createBaseVNode("span", {
            class: normalizeClass(["lite-tree-node", o.classs]),
            onClick: (h2) => s(o),
            style: normalizeStyle(o.style)
          }, [
            unref(t).hasFlag ? (openBlock(), createElementBlock("span", ge, toDisplayString(o.flag), 1)) : createCommentVNode("", true),
            createBaseVNode("span", {
              class: "indent",
              style: normalizeStyle({ width: r.indent + "px" })
            }, null, 4),
            e(o) ? (openBlock(), createElementBlock("span", {
              key: 1,
              class: normalizeClass([
                "node-indicator",
                "icon",
                "arrow",
                { expand: l(o) }
              ])
            }, null, 2)) : createCommentVNode("", true),
            createBaseVNode("span", {
              class: normalizeClass(["icon", o.icon ? o.icon : e(o) ? l(o) ? "folder-open" : "folder" : "file"])
            }, null, 2),
            createBaseVNode("span", me, [
              createVNode(w, {
                value: o.title
              }, null, 8, ["value"]),
              (openBlock(true), createElementBlock(Fragment, null, renderList(o.tags, (h2) => (openBlock(), createBlock(w, {
                class: "tag",
                key: h2,
                value: h2
              }, null, 8, ["value"]))), 128))
            ]),
            createVNode(w, {
              class: "comment",
              value: o.comment
            }, null, 8, ["value"])
          ], 14, de),
          createVNode(unref(oe), {
            active: l(o),
            duration: 200
          }, {
            default: withCtx(() => [
              e(o) && l(o) ? (openBlock(), createBlock(m, {
                key: 0,
                indent: r.indent + 20,
                class: normalizeClass(l(o) ? "expand" : "close"),
                nodes: o.children
              }, null, 8, ["indent", "class", "nodes"])) : createCommentVNode("", true)
            ]),
            _: 2
          }, 1032, ["active"])
        ]))), 128))
      ]);
    };
  }
});
var P = (i, n) => {
  const t = i.__vccOpts || i;
  for (const [s, e] of n)
    t[s] = e;
  return t;
};
var ue = P(Ie, [["__scopeId", "data-v-7b5f0052"]]);
var fe = {
  file: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxZW0iIGhlaWdodD0iMWVtIiB2aWV3Qm94PSIwIDAgMzIgMzIiPjxwYXRoIGZpbGw9ImN1cnJlbnRDb2xvciIgZD0ibTI1LjcgOS4zbC03LTdjLS4yLS4yLS40LS4zLS43LS4zSDhjLTEuMSAwLTIgLjktMiAydjI0YzAgMS4xLjkgMiAyIDJoMTZjMS4xIDAgMi0uOSAyLTJWMTBjMC0uMy0uMS0uNS0uMy0uN3pNMTggNC40bDUuNiA1LjZIMThWNC40ek0yNCAyOEg4VjRoOHY2YzAgMS4xLjkgMiAyIDJoNnYxNnoiLz48cGF0aCBmaWxsPSJjdXJyZW50Q29sb3IiIGQ9Ik0xMCAyMmgxMnYySDEwem0wLTZoMTJ2MkgxMHoiLz48L3N2Zz4=",
  folder: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxZW0iIGhlaWdodD0iMWVtIiB2aWV3Qm94PSIwIDAgMjQgMjQiPjxwYXRoIGZpbGw9Im5vbmUiIHN0cm9rZT0iY3VycmVudENvbG9yIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIHN0cm9rZS13aWR0aD0iMiIgZD0iTTUgNGg0bDMgM2g3YTIgMiAwIDAgMSAyIDJ2OGEyIDIgMCAwIDEtMiAySDVhMiAyIDAgMCAxLTItMlY2YTIgMiAwIDAgMSAyLTIiLz48L3N2Zz4=",
  "folder-open": "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxZW0iIGhlaWdodD0iMWVtIiB2aWV3Qm94PSIwIDAgMjQgMjQiPjxwYXRoIGZpbGw9Im5vbmUiIHN0cm9rZT0iY3VycmVudENvbG9yIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIHN0cm9rZS13aWR0aD0iMiIgZD0ibTUgMTlsMi43NTctNy4zNTFBMSAxIDAgMCAxIDguNjkzIDExSDIxYTEgMSAwIDAgMSAuOTg2IDEuMTY0bC0uOTk2IDUuMjExQTIgMiAwIDAgMSAxOS4wMjYgMTl6YTIgMiAwIDAgMS0yLTJWNmEyIDIgMCAwIDEgMi0yaDRsMyAzaDdhMiAyIDAgMCAxIDIgMnYyIi8+PC9zdmc+",
  arrow: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxZW0iIGhlaWdodD0iMWVtIiB2aWV3Qm94PSIwIDAgMzIgMzIiPjxwYXRoIGZpbGw9IiNhYmFiYWIiIGQ9Im0xMiA4bDEwIDhsLTEwIDh6Ii8+PC9zdmc+",
  tag: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxZW0iIGhlaWdodD0iMWVtIiB2aWV3Qm94PSIwIDAgMzIgMzIiPjxwYXRoIGZpbGw9ImN1cnJlbnRDb2xvciIgZD0iTTEwIDE0YTQgNCAwIDEgMSA0LTRhNC4wMDUgNC4wMDUgMCAwIDEtNCA0Wm0wLTZhMiAyIDAgMSAwIDEuOTk4IDIuMDA0QTIuMDAyIDIuMDAyIDAgMCAwIDEwIDhaIi8+PHBhdGggZmlsbD0iY3VycmVudENvbG9yIiBkPSJNMTYuNjQ0IDI5LjQxNUwyLjU4NiAxNS4zNTRBMiAyIDAgMCAxIDIgMTMuOTQxVjRhMiAyIDAgMCAxIDItMmg5Ljk0MWEyIDIgMCAwIDEgMS40MTQuNTg2bDE0LjA2IDE0LjA1OGEyIDIgMCAwIDEgMCAyLjgyOGwtOS45NDMgOS45NDNhMiAyIDAgMCAxLTIuODI5IDBaTTQgNHY5Ljk0MkwxOC4wNTggMjhMMjggMTguMDU4TDEzLjk0MiA0WiIvPjwvc3ZnPg==",
  checked: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxZW0iIGhlaWdodD0iMWVtIiB2aWV3Qm94PSIwIDAgMjEgMjEiPjxnIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCIgc3Ryb2tlPSJjdXJyZW50Q29sb3IiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCI+PHBhdGggZD0iTTUuNSAzLjVoMTBhMiAyIDAgMCAxIDIgMnYxMGEyIDIgMCAwIDEtMiAyaC0xMGEyIDIgMCAwIDEtMi0ydi0xMGEyIDIgMCAwIDEgMi0yIi8+PHBhdGggZD0ibTcuNSAxMC41bDIgMmw0LTQiLz48L2c+PC9zdmc+",
  unchecked: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxZW0iIGhlaWdodD0iMWVtIiB2aWV3Qm94PSIwIDAgMjEgMjEiPjxwYXRoIGZpbGw9Im5vbmUiIHN0cm9rZT0iY3VycmVudENvbG9yIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGQ9Ik01LjUgMy41aDEwYTIgMiAwIDAgMSAyIDJ2MTBhMiAyIDAgMCAxLTIgMmgtMTBhMiAyIDAgMCAxLTItMnYtMTBhMiAyIDAgMCAxIDItMiIvPjwvc3ZnPg==",
  star: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxZW0iIGhlaWdodD0iMWVtIiB2aWV3Qm94PSIwIDAgMjQgMjQiPjxwYXRoIGZpbGw9ImN1cnJlbnRDb2xvciIgZD0ibTIyIDkuMjRsLTcuMTktLjYyTDEyIDJMOS4xOSA4LjYzTDIgOS4yNGw1LjQ2IDQuNzNMNS44MiAyMUwxMiAxNy4yN0wxOC4xOCAyMWwtMS42My03LjAzek0xMiAxNS40bC0zLjc2IDIuMjdsMS00LjI4bC0zLjMyLTIuODhsNC4zOC0uMzhMMTIgNi4xbDEuNzEgNC4wNGw0LjM4LjM4bC0zLjMyIDIuODhsMSA0LjI4eiIvPjwvc3ZnPg=="
};
function pe() {
  let i = document.querySelector("#lite_tree_icons");
  return i || (i = document.createElement("style"), i.id = "lite_tree_icons", i.innerHTML = `.lite-tree .icon{
            display:inline-block;
            width:1em;
            height:1em;
            margin:0.2em;
        }`, document.head.appendChild(i)), i;
}
var Me = /(\<\?xml(.*)?\?\>)|(\<\!DOCTYPE.*?\>)|(width\=\"\d+\"\s?)|(height\=\"\d+\"\s?)|(\bxmlns(\:\w+)?\=\".*?\"\s?)|(p\-id\=\"\d+\"\s?)|(t\=\"\d+\"\s?)|(version\=\".*?\"\s?)|(class\=\"\w+\"\s?)/gm;
function ye(i) {
  return i.replace(Me, "");
}
function xe(i) {
  const n = pe();
  for (let [t, s] of Object.entries({ ...i, ...fe })) {
    const e = `.icon.${t}`, l = s.startsWith("<svg"), r = l ? ye(s).replaceAll("<", "%3C").replaceAll(">", "%3E").replaceAll('"', "'") : s, c = `.lite-tree ${e}{
            background-color: currentColor;
            mask-image: url("${l ? `data:image/svg+xml,${r}` : r}");            
        }`;
    n.innerHTML.includes(`.lite-tree ${e}`) || (n.innerHTML = n.innerHTML + `
` + c);
  }
}
var De = { class: "lite-tree" };
var Ae = defineComponent({
  __name: "index",
  props: {
    indent: { default: 4 },
    format: { default: "lite" },
    iconset: { default: () => ["folder", "file"] }
  },
  setup(i) {
    ((a, d) => {
      let g = document.getElementById("hroaqb5");
      g || (g = document.createElement("style"), g.id = "hroaqb5", document.head.appendChild(g), g.innerHTML = d);
    })("hroaqb5", `
.lite-tree[data-v-hroaqb5]{
  position: relative;
  padding: 8px;
  border: 1px solid #eee;
  text-align: left;
}
`);
    const t = i, s = ref(false), e = ref(false), l = useSlots(), r = () => {
      var d;
      const a = (d = l.default) == null ? void 0 : d.call(l)[0];
      if (a && typeof a.children == "string") {
        try {
          return re(a.children, {
            format: t.format,
            forEach: (g) => {
              const M = g.flag;
              M && M.length > 0 && (e.value = true, M in H && g.classs.push(H[M]));
            }
          });
        } catch (g) {
          s.value = true, console.error(g), I = [{
            title: "Invalid data provided to LiteTree",
            style: "color:red",
            // @ts-ignore
            children: [{ title: g.message, style: "color:red" }]
          }];
        }
        return { classs: {}, styles: {}, icons: {}, nodes: [] };
      } else
        return { classs: {}, styles: {}, icons: {}, nodes: [] };
    }, c = (a) => {
      F(`        
        ${Object.keys(a).map((d) => `.lite-tree ${d} { ${q(a[d])} }`).join(`
`)} 
    `, { id: "lite-tree-custom-styles", mode: "replace" });
    }, { nodes: m, styles: o, classs: f, icons: h2 } = r();
    c(f), xe(h2);
    let I = reactive(m);
    return provide(N, {
      hasFlag: e.value,
      indent: t.indent,
      styles: o,
      classs: f,
      icons: h2
    }), (a, d) => (openBlock(), createElementBlock("div", De, [
      createVNode(ue, { nodes: unref(I) }, null, 8, ["nodes"])
    ]));
  }
});
var ve = P(Ae, [["__scopeId", "data-v-3456b343"]]);
export {
  ve as default
};
//# sourceMappingURL=lite-tree_vue.js.map
