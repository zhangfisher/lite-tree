import {
  Fragment,
  createBaseVNode,
  createBlock,
  createCommentVNode,
  createElementBlock,
  createTextVNode,
  createVNode,
  defineComponent,
  h,
  normalizeClass,
  normalizeStyle,
  openBlock,
  reactive,
  ref,
  renderList,
  resolveComponent,
  toDisplayString,
  unref,
  useSlots,
  withCtx
} from "./chunk-RVDMA4KA.js";

// node_modules/.pnpm/lite-tree@1.0.0_typescript@5.4.2/node_modules/lite-tree/dist/litetree.mjs
var R = new RegExp("(?<!(\\s*\\,\\s*)|([\\[\\{\\}]\\s*))\\n(?!\\s*\\}\\s*)", "gm");
var V = new RegExp(`((?<!\\\\)\\"|\\')(.*?)((?<!\\\\)\\1)`, "gm");
var J = new RegExp('([\\s\\[\\,\\{\\b]{1})(?<!\\"])(\\w+)(?!\\")(\\s*\\:)', "gm");
function M(e, i) {
  try {
    return JSON.parse(e, (l, t) => i ? i(l, t) : t);
  } catch {
  }
  let o = e.replaceAll(R, `,
`);
  return o = o.replaceAll(V, (l, t, c, n) => `"${encodeURI(c)}"`), o = o.replaceAll(J, (l, t, c, n) => `${t}"${c}"${n}`), o = o.replaceAll("，", ",").replaceAll("“", '"').replaceAll("”", '"'), JSON.parse(o, (l, t) => (typeof t == "string" && (t = decodeURI(t)), i ? i(l, t) : t));
}
function v(e) {
  var o;
  let i = (o = e.match(/^\{.*?\}/)) == null ? void 0 : o[0];
  return i && (e = e.replace(i, ""), i = i.slice(1, -1)), { style: i, value: e };
}
var O = {};
var U = defineComponent({
  ...O,
  __name: "Memo",
  props: {
    value: {
      type: String,
      default: ""
    }
  },
  setup(e) {
    ((t, c) => {
      let n = document.getElementById("hcfs9a4");
      n || (n = document.createElement("style"), n.id = "hcfs9a4", document.head.appendChild(n), n.innerHTML = c);
    })("hcfs9a4", `.lite-tree-node-memo {
  color: #aaa;
  margin-right: 4px;
}
`);
    const l = reactive(v(e.value));
    return (t, c) => e.value && String(e.value).trim().length > 0 ? (openBlock(), createElementBlock("span", {
      key: 0,
      class: "lite-tree-node-memo",
      style: normalizeStyle(l.style)
    }, toDisplayString(l.value), 5)) : createCommentVNode("", true);
  }
});
var q = {};
var z = defineComponent({
  ...q,
  __name: "Tag",
  props: {
    value: {
      type: String,
      default: ""
      //{red}重点
    }
  },
  setup(e) {
    ((c, n) => {
      let d = document.getElementById("hxvlqyo");
      d || (d = document.createElement("style"), d.id = "hxvlqyo", document.head.appendChild(d), d.innerHTML = n);
    })("hxvlqyo", `.lite-tree-node-tag {
  background-color: #eee;
  color: #333;
  padding: 2px 4px;
  border-radius: 4px;
  border: 1px solid #ddd;
  margin-left: 2px;
  margin-right: 2px;
  font-size: 12px;
}
`);
    const o = e, l = {
      success: "color:#28a745;border:1px solid #28a745;background-color:#bfffce;",
      warning: "color:#ffc107;border:1px solid #ffc107;background-color:#fff9e7;",
      error: "color:#dc3545;border:1px solid #dc3545;background-color:#ffd7d7;",
      info: "color:#17a2b8;border:1px solid #17a2b8;background-color:#e6fcff;"
    };
    let t = v(o.value);
    return t.style && t.style in l && (t.style = l[t.style]), (c, n) => (openBlock(), createElementBlock("span", {
      class: "lite-tree-node-tag",
      style: normalizeStyle(unref(t).style)
    }, toDisplayString(unref(t).value), 5));
  }
});
var D = {
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
      const e = {
        "aria-hidden": !this.active,
        "aria-expanded": this.active
      };
      return this.useHidden && (e.hidden = this.hidden), e;
    }
  },
  methods: {
    layout() {
      this.active ? (this.hidden = false, this.$emit("open-start"), this.initial && this.setHeight("0px", () => this.el.scrollHeight + "px")) : (this.$emit("close-start"), this.setHeight(this.el.scrollHeight + "px", () => "0px"));
    },
    asap(e) {
      this.initial ? this.$nextTick(e) : e();
    },
    setHeight(e, i) {
      this.style = { height: e }, this.asap(() => {
        this.__ = this.el.scrollHeight, this.style = {
          height: i(),
          overflow: "hidden",
          "transition-property": "height",
          "transition-duration": this.duration + "ms"
        };
      });
    },
    onTransitionEnd(e) {
      e.target === this.el && (this.active ? (this.style = {}, this.$emit("open-end")) : (this.style = {
        height: "0",
        overflow: "hidden"
      }, this.hidden = true, this.$emit("close-end")));
    }
  }
};
var j = ["onClick"];
var F = createBaseVNode("span", { class: "icon" }, null, -1);
var K = {
  name: "LiteTree"
};
var G = defineComponent({
  ...K,
  props: {
    root: {
      type: Boolean,
      default: true
    },
    indent: {
      type: Number,
      default: 0
    }
  },
  setup(e) {
    var w;
    ((s, m) => {
      let a = document.getElementById("hxfrgiw");
      a || (a = document.createElement("style"), a.id = "hxfrgiw", document.head.appendChild(a), a.innerHTML = m);
    })("hxfrgiw", `.lite-tree-nodes {
  color: #555;
  display: flex;
  flex-direction: column;
  list-style: none!important;
  padding: 0;
}
.lite-tree-nodes.root {
  padding: 8px;
  border: 1px solid #eee;
}
.lite-tree-nodes > li {
  width: 100%;
}
.lite-tree-nodes .open {
  transition: height 0.3s;
  height: auto;
}
.lite-tree-nodes .close {
  transition: height 0.3s;
  height: 0;
  overflow: hidden;
}
.lite-tree-nodes span.lite-tree-node {
  cursor: pointer;
  display: flex;
  width: 100%;
  padding: 4px;
  margin: 0px;
  align-items: center;
}
.lite-tree-nodes span.lite-tree-node.success {
  background-color: #f3ffec;
  color: green;
}
.lite-tree-nodes span.lite-tree-node.warning {
  background-color: #fff6e9;
  color: orange;
}
.lite-tree-nodes span.lite-tree-node.error {
  background-color: #ffeaea;
  color: red;
}
.lite-tree-nodes span.lite-tree-node.info {
  background-color: #f5f5f5;
}
.lite-tree-nodes span.lite-tree-node .title {
  flex-grow: 1;
}
.lite-tree-nodes span.lite-tree-node .arrow {
  width: 20px;
  height: 10px;
  border-left: 10px solid #999;
  border-right: 10px solid transparent;
  border-bottom: 5px solid transparent;
  border-top: 5px solid transparent;
  transform-origin: 5px center;
  transform: rotate(0deg);
  transition: all 0.2s;
}
.lite-tree-nodes span.lite-tree-node .arrow.open {
  transform-origin: 5px center;
  transform: rotate(90deg);
  transition: all 0.2s;
}
.lite-tree-nodes span.lite-tree-node .memo {
  color: #aaa;
}
.lite-tree-nodes span.lite-tree-node:hover {
  background-color: #f8f8f8;
  border-radius: 4px;
}
`);
    const o = (s) => {
      s.open = s.open == null ? false : !s.open;
    }, l = (s) => Array.isArray(s.children) && s.children.length > 0, t = (s) => s.open == null ? true : s.open, c = ref(false), n = useSlots();
    let d = [];
    if (n.default) {
      const s = (w = n.default) == null ? void 0 : w.call(n)[0];
      if (s && typeof s.children == "string")
        try {
          d = M(s.children.trim(), (m, a) => (typeof a == "object" && !Array.isArray(a) && (a.open = a.open == null ? true : a.open), a)), c.value = false, d = reactive(Array.isArray(d) ? d : [d]);
        } catch {
          c.value = true, d = [{ title: "Invalid JSON data provided to LiteTree", mark: "error" }];
        }
    }
    return (s, m) => {
      const a = resolveComponent("LiteTree");
      return openBlock(), createElementBlock("ul", {
        class: normalizeClass(["lite-tree-nodes", { root: e.root }])
      }, [
        (openBlock(true), createElementBlock(Fragment, null, renderList(unref(d), (r) => (openBlock(), createElementBlock("li", {
          key: r.id || r.title
        }, [
          createBaseVNode("span", {
            class: normalizeClass(["lite-tree-node", r.mark]),
            onClick: (_) => o(r),
            style: normalizeStyle(r.style)
          }, [
            createBaseVNode("span", {
              class: "indent",
              style: normalizeStyle({ width: e.indent + "px" })
            }, null, 4),
            createBaseVNode("span", {
              class: normalizeClass(l(r) ? ["arrow", { open: r.open == null ? true : r.open }] : null)
            }, null, 2),
            F,
            createBaseVNode("span", {
              class: "title",
              style: normalizeStyle(unref(v)(r.title).style)
            }, toDisplayString(unref(v)(r.title).value), 5),
            createVNode(U, {
              value: r.memo
            }, null, 8, ["value"]),
            (openBlock(true), createElementBlock(Fragment, null, renderList(r.tags, (_) => (openBlock(), createBlock(z, {
              key: _,
              value: _
            }, null, 8, ["value"]))), 128))
          ], 14, j),
          createVNode(unref(D), {
            active: t(r),
            duration: 200
          }, {
            default: withCtx(() => [
              l(r) && t(r) && !c.value ? (openBlock(), createBlock(a, {
                key: 0,
                root: false,
                indent: e.indent + 20,
                class: normalizeClass(t(r) ? "open" : "close")
              }, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(r.children), 1)
                ]),
                _: 2
              }, 1032, ["indent", "class"])) : createCommentVNode("", true)
            ]),
            _: 2
          }, 1032, ["active"])
        ]))), 128))
      ], 2);
    };
  }
});
export {
  G as default
};
//# sourceMappingURL=lite-tree.js.map
