(function(factory) {
  typeof define === "function" && define.amd ? define(factory) : factory();
})(function() {
  "use strict";var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};

  function _typeof(o2) {
    "@babel/helpers - typeof";
    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o3) {
      return typeof o3;
    } : function(o3) {
      return o3 && "function" == typeof Symbol && o3.constructor === Symbol && o3 !== Symbol.prototype ? "symbol" : typeof o3;
    }, _typeof(o2);
  }
  function toPrimitive(t, r2) {
    if ("object" != _typeof(t) || !t)
      return t;
    var e = t[Symbol.toPrimitive];
    if (void 0 !== e) {
      var i2 = e.call(t, r2 || "default");
      if ("object" != _typeof(i2))
        return i2;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return ("string" === r2 ? String : Number)(t);
  }
  function toPropertyKey(t) {
    var i2 = toPrimitive(t, "string");
    return "symbol" == _typeof(i2) ? i2 : i2 + "";
  }
  function _defineProperty(obj, key, value) {
    key = toPropertyKey(key);
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }
    return obj;
  }
  function _objectWithoutPropertiesLoose(source, excluded) {
    if (source == null)
      return {};
    var target = {};
    var sourceKeys = Object.keys(source);
    var key, i2;
    for (i2 = 0; i2 < sourceKeys.length; i2++) {
      key = sourceKeys[i2];
      if (excluded.indexOf(key) >= 0)
        continue;
      target[key] = source[key];
    }
    return target;
  }
  function _objectWithoutProperties(source, excluded) {
    if (source == null)
      return {};
    var target = _objectWithoutPropertiesLoose(source, excluded);
    var key, i2;
    if (Object.getOwnPropertySymbols) {
      var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
      for (i2 = 0; i2 < sourceSymbolKeys.length; i2++) {
        key = sourceSymbolKeys[i2];
        if (excluded.indexOf(key) >= 0)
          continue;
        if (!Object.prototype.propertyIsEnumerable.call(source, key))
          continue;
        target[key] = source[key];
      }
    }
    return target;
  }
  function r(e) {
    return "function" == typeof e;
  }
  var n = Array.prototype.slice, o = () => {
  };
  var i = { _catchError: function(e, t, r2, n2) {
    for (var o2, i2, s2; t = t._parent; )
      if ((o2 = t._component) && !o2._processingException)
        try {
          if ((i2 = o2.constructor) && null != i2.getDerivedStateFromError && (Object.assign(o2, i2.getDerivedStateFromError(e)), s2 = o2._dirty), null != o2.componentDidCatch && (o2.componentDidCatch(e, n2 || {}), s2 = o2._dirty), s2)
            return o2._pendingError = o2;
        } catch (t2) {
          e = t2;
        }
    throw e;
  } }, s = 0;
  function l(e, t, r2) {
    var o2, i2, s2, l2 = {};
    for (s2 in t)
      "key" == s2 ? o2 = t[s2] : "ref" == s2 ? i2 = t[s2] : l2[s2] = t[s2];
    if (arguments.length > 2 && (l2.children = arguments.length > 3 ? n.call(arguments, 2) : r2), "function" == typeof e && null != e.defaultProps)
      for (s2 in e.defaultProps)
        void 0 === l2[s2] && (l2[s2] = e.defaultProps[s2]);
    return d(e, l2, o2, i2, null);
  }
  function d(e, t, r2, n2, o2) {
    var l2 = { type: e, props: t, key: r2, ref: n2, _children: null, _parent: null, _depth: 0, _dom: null, _nextDom: void 0, _component: null, _hydrating: null, constructor: void 0, _original: null == o2 ? ++s : o2 };
    return null == o2 && null != i.vnode && i.vnode(l2), l2;
  }
  function a(e) {
    return e.children;
  }
  var c = {}, h = [], u = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i;
  function p(e) {
    this.props = e, this._dirty = false;
  }
  function f(e, t) {
    if (null == t)
      return e._parent ? f(e._parent, e._parent._children.indexOf(e) + 1) : null;
    for (var r2; t < e._children.length; t++)
      if (null != (r2 = e._children[t]) && null != r2._dom)
        return r2._dom;
    return "function" == typeof e.type ? f(e) : null;
  }
  function v(e, t, r2, n2, o2, i2, s2) {
    var l2, u2, p2, v2, g2, b2, w2, O2 = n2 && n2._children || h, k2 = O2.length;
    for (r2._children = [], l2 = 0; l2 < t.length; l2++)
      if (null != (v2 = null == (v2 = t[l2]) || "boolean" == typeof v2 || "function" == typeof v2 ? r2._children[l2] = null : "string" == typeof v2 || "number" == typeof v2 || "bigint" == typeof v2 ? r2._children[l2] = d(null, v2, null, null, v2) : Array.isArray(v2) ? r2._children[l2] = d(a, { children: v2 }, null, null, null) : v2._depth > 0 ? r2._children[l2] = d(v2.type, v2.props, v2.key, v2.ref ? v2.ref : null, v2._original) : r2._children[l2] = v2)) {
        if (v2._parent = r2, v2._depth = r2._depth + 1, null === (p2 = O2[l2]) || p2 && v2.key == p2.key && v2.type === p2.type)
          O2[l2] = void 0;
        else
          for (u2 = 0; u2 < k2; u2++) {
            if ((p2 = O2[u2]) && v2.key == p2.key && v2.type === p2.type) {
              O2[u2] = void 0;
              break;
            }
            p2 = null;
          }
        E(e, v2, p2 = p2 || c, o2, i2, s2), g2 = v2._dom, (u2 = v2.ref) && p2.ref != u2 && (w2 || (w2 = []), p2.ref && w2.push(p2.ref, null, v2), w2.push(u2, v2._component || g2, v2)), null != g2 ? (null == b2 && (b2 = g2), "function" == typeof v2.type && v2._children === p2._children ? v2._nextDom = s2 = m(v2, s2, e) : s2 = _(e, v2, p2, O2, g2, s2), "function" == typeof r2.type && (r2._nextDom = s2)) : s2 && p2._dom == s2 && s2.parentNode != e && (s2 = f(p2));
      }
    for (r2._dom = b2, l2 = k2; l2--; )
      null != O2[l2] && ("function" == typeof r2.type && null != O2[l2]._dom && O2[l2]._dom == r2._nextDom && (r2._nextDom = y(n2).nextSibling), P(O2[l2], O2[l2]));
    if (w2)
      for (l2 = 0; l2 < w2.length; l2++)
        D(w2[l2], w2[++l2], w2[++l2]);
  }
  function m(e, t, r2) {
    for (var n2 = e._children, o2 = 0; n2 && o2 < n2.length; o2++) {
      var i2 = n2[o2];
      i2 && (i2._parent = e, t = "function" == typeof i2.type ? m(i2, t, r2) : _(r2, i2, i2, n2, i2._dom, t));
    }
    return t;
  }
  function _(e, t, r2, n2, o2, i2) {
    var s2;
    if (void 0 !== t._nextDom)
      s2 = t._nextDom, t._nextDom = void 0;
    else if (null == r2 || o2 != i2 || null == o2.parentNode)
      e:
        if (null == i2 || i2.parentNode !== e)
          e.appendChild(o2), s2 = null;
        else {
          for (var l2 = i2, d2 = 0; (l2 = l2.nextSibling) && d2 < n2.length; d2 += 1)
            if (l2 == o2)
              break e;
          e.insertBefore(o2, i2), s2 = i2;
        }
    return i2 = void 0 !== s2 ? s2 : o2.nextSibling;
  }
  function y(e) {
    if (null == e.type || "string" == typeof e.type)
      return e._dom;
    if (e._children)
      for (var t = e._children.length - 1; t >= 0; t--) {
        var r2 = e._children[t];
        if (r2) {
          var n2 = y(r2);
          if (n2)
            return n2;
        }
      }
    return null;
  }
  function g(e, t, r2) {
    "-" === t[0] ? e.setProperty(t, null == r2 ? "" : r2) : null == r2 ? e[t] = "" : "number" != typeof r2 || u.test(t) ? e[t] = r2 : e[t] = r2 + "px";
  }
  function b(e, t, r2, n2, o2) {
    var i2;
    e:
      if ("style" === t)
        if ("string" == typeof r2)
          e.style.cssText = r2;
        else {
          if ("string" == typeof n2 && (e.style.cssText = n2 = ""), n2)
            for (t in n2)
              r2 && t in r2 || g(e.style, t, "");
          if (r2)
            for (t in r2)
              n2 && r2[t] === n2[t] || g(e.style, t, r2[t]);
        }
      else if ("o" === t[0] && "n" === t[1])
        if (i2 = t !== (t = t.replace(/Capture$/, "")), t = t.toLowerCase() in e ? t.toLowerCase().slice(2) : t.slice(2), e._listeners || (e._listeners = {}), e._listeners[t + i2] = r2, r2) {
          if (!n2) {
            var s2 = i2 ? O : w;
            e.addEventListener(t, s2, i2);
          }
        } else {
          var l2 = i2 ? O : w;
          e.removeEventListener(t, l2, i2);
        }
      else if ("dangerouslySetInnerHTML" !== t) {
        if (o2)
          t = t.replace(/xlink(H|:h)/, "h").replace(/sName$/, "s");
        else if ("width" !== t && "height" !== t && "href" !== t && "list" !== t && "form" !== t && "tabIndex" !== t && "download" !== t && t in e)
          try {
            e[t] = null == r2 ? "" : r2;
            break e;
          } catch (e2) {
          }
        "function" == typeof r2 || (null == r2 || false === r2 && -1 == t.indexOf("-") ? e.removeAttribute(t) : e.setAttribute(t, r2));
      }
  }
  function w(e) {
    return this._listeners[e.type + false](i.event ? i.event(e) : e);
  }
  function O(e) {
    return this._listeners[e.type + true](i.event ? i.event(e) : e);
  }
  function E(e, t, r2, o2, s2, l2) {
    var d2, h2 = t.type;
    if (void 0 !== t.constructor)
      return null;
    (d2 = i._diff) && d2(t);
    try {
      e:
        if ("function" == typeof h2) {
          var u2, m2, _2, y2 = t.props;
          if (r2._component)
            _2 = (u2 = t._component = r2._component)._processingException = u2._pendingError;
          else {
            if ("prototype" in h2 && h2.prototype.render && "development" === { "env": {} }.env.NODE_ENV)
              throw new Error("Class component in render method is not supported.");
            t._component = u2 = new p(y2), u2.constructor = h2, u2.render = k, u2.props = y2, m2 = u2._dirty = true;
          }
          if (u2.props, u2._vnode = t, m2)
            ;
          else if (t._original === r2._original) {
            t._dom = r2._dom, t._children = r2._children, t._children.forEach((e2) => {
              e2 && (e2._parent = t);
            });
            break e;
          }
          u2.props = y2, u2._parentDom = e;
          var g2 = i._render, w2 = 0;
          do {
            u2._dirty = false, g2 && g2(t), d2 = u2.render(u2.props);
          } while (u2._dirty && ++w2 < 25);
          var O2 = null != d2 && d2.type === a && null == d2.key ? d2.props.children : d2;
          v(e, Array.isArray(O2) ? O2 : [O2], t, r2, o2, s2, l2), u2.base = t._dom, _2 && (u2._pendingError = u2._processingException = null);
        } else
          null == s2 && t._original === r2._original ? (t._children = r2._children, t._dom = r2._dom) : t._dom = function(e2, t2, r3, o3, i2) {
            var s3 = r3.props, l3 = t2.props, d3 = t2.type, a2 = 0;
            "svg" === d3 && (o3 = true);
            if (null != i2)
              for (; a2 < i2.length; a2++) {
                var h3 = i2[a2];
                if (h3 && "setAttribute" in h3 == !!d3 && (d3 ? h3.localName === d3 : 3 === h3.nodeType)) {
                  e2 = h3, i2[a2] = null;
                  break;
                }
              }
            if (null == e2) {
              if (null === d3)
                return document.createTextNode(l3);
              e2 = o3 ? document.createElementNS("http://www.w3.org/2000/svg", d3) : document.createElement(d3, l3.is && l3), i2 = null;
            }
            if (null === d3)
              s3 !== l3 && (e2.data = l3);
            else {
              i2 = i2 && n.call(e2.childNodes);
              var u3 = (s3 = r3.props || c).dangerouslySetInnerHTML, p2 = l3.dangerouslySetInnerHTML;
              if (null != i2)
                for (s3 = {}, a2 = 0; a2 < e2.attributes.length; a2++)
                  s3[e2.attributes[a2].name] = e2.attributes[a2].value;
              if ((p2 || u3) && (p2 && (u3 && p2.__html == u3.__html || p2.__html === e2.innerHTML) || (e2.innerHTML = p2 && p2.__html || "")), function(e3, t3, r4, n2) {
                var o4;
                for (o4 in r4)
                  "children" === o4 || "key" === o4 || o4 in t3 || b(e3, o4, null, r4[o4], n2);
                for (o4 in t3)
                  "children" !== o4 && "key" !== o4 && "value" !== o4 && "checked" !== o4 && r4[o4] !== t3[o4] && b(e3, o4, t3[o4], r4[o4], n2);
              }(e2, l3, s3, o3), p2)
                t2._children = [];
              else if (a2 = t2.props.children, v(e2, Array.isArray(a2) ? a2 : [a2], t2, r3, o3 && "foreignObject" !== d3, i2, i2 ? i2[0] : r3._children && f(r3, 0)), null != i2)
                for (a2 = i2.length; a2--; )
                  null != i2[a2] && i2[a2].remove();
              "value" in l3 && void 0 !== (a2 = l3.value) && (a2 !== e2.value || "progress" === d3 && !a2 || "option" === d3 && a2 !== s3.value) && b(e2, "value", a2, s3.value, false), "checked" in l3 && void 0 !== (a2 = l3.checked) && a2 !== e2.checked && b(e2, "checked", a2, s3.checked, false);
            }
            return e2;
          }(r2._dom, t, r2, o2, s2);
      (d2 = i.diffed) && d2(t);
    } catch (e2) {
      t._original = null, null != s2 && (t._dom = l2, s2[s2.indexOf(l2)] = null), i._catchError(e2, t, r2);
    }
  }
  function D(e, t, r2) {
    try {
      "function" == typeof e ? e(t) : e.current = t;
    } catch (e2) {
      i._catchError(e2, r2);
    }
  }
  function P(e, t, r2) {
    var n2;
    if (i.unmount && i.unmount(e), (n2 = e.ref) && (n2.current && n2.current !== e._dom || D(n2, null, t)), null != (n2 = e._component) && (n2.base = n2._parentDom = null, e._component = void 0), n2 = e._children)
      for (var o2 = 0; o2 < n2.length; o2++)
        n2[o2] && P(n2[o2], t, r2 || "function" != typeof e.type);
    r2 || null == e._dom || e._dom.remove(), e._parent = e._dom = e._nextDom = void 0;
  }
  function k(e) {
    return this.constructor(e);
  }
  p.prototype.render = a;
  class S {
    constructor() {
      _defineProperty(this, "map", /* @__PURE__ */ new Map());
    }
    get(e, t) {
      var r2 = this.map.get(e);
      if (r2)
        return t ? r2.get(t) : r2;
    }
    set(e, t, r2) {
      var n2, o2 = this.map.get(e);
      o2 || (o2 = /* @__PURE__ */ new Map(), this.map.set(e, o2)), null === (n2 = o2) || void 0 === n2 || n2.set(t, r2);
    }
    forEach(e) {
      this.map.forEach((t, r2) => {
        t.forEach((t2, n2) => {
          e(t2, r2, n2);
        });
      });
    }
    delete(e) {
      this.map.delete(e);
    }
    deleteAll() {
      this.map.forEach((e, t) => {
        this.map.delete(t);
      });
    }
  }
  class x {
    constructor() {
      _defineProperty(this, "eventMap", new S()), _defineProperty(this, "bindListener", (e, t, r2) => {
        if (e && t && r2) {
          var n2 = this.eventMap.get(e, t);
          n2 || (n2 = /* @__PURE__ */ new Set(), this.eventMap.set(e, t, n2)), n2.has(r2) || (n2.add(r2), e.addEventListener(t, r2, true));
        }
      }), _defineProperty(this, "removeAllListener", () => {
        this.eventMap.forEach((e, t, r2) => {
          e.forEach((e2) => {
            t.removeEventListener(r2, e2, true);
          });
        }), this.eventMap.deleteAll();
      });
    }
  }
  function C(e, t) {
    var r2 = Object.keys(e);
    if (Object.getOwnPropertySymbols) {
      var n2 = Object.getOwnPropertySymbols(e);
      t && (n2 = n2.filter(function(t2) {
        return Object.getOwnPropertyDescriptor(e, t2).enumerable;
      })), r2.push.apply(r2, n2);
    }
    return r2;
  }
  function j(t) {
    for (var r2 = 1; r2 < arguments.length; r2++) {
      var n2 = null != arguments[r2] ? arguments[r2] : {};
      r2 % 2 ? C(Object(n2), true).forEach(function(r3) {
        _defineProperty(t, r3, n2[r3]);
      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(n2)) : C(Object(n2)).forEach(function(e) {
        Object.defineProperty(t, e, Object.getOwnPropertyDescriptor(n2, e));
      });
    }
    return t;
  }
  var M, U = 0, A = [], L = /* @__PURE__ */ new Set(), N = false, I = false, T = 0, W = false, R = [], z = () => {
    W = false;
    for (var e = R.splice(0, R.length), t = 0; t < e.length; t++)
      e[t]();
  }, H = (e, t) => {
    var r2, n2, o2 = !e && new Promise((e2) => {
      r2 = e2;
    });
    return R.push(() => {
      e ? e.call(t) : r2(t);
    }), W || (W = true, n2 = z, "function" == typeof window.queueMicrotask ? window.queueMicrotask(n2) : Promise.resolve().then(n2)), o2;
  }, V = () => {
    for (N = true, A.sort((e2, t) => e2.id - t.id), T = 0; T < A.length; T++) {
      var e = A[T];
      L.delete(e.id), e.run();
    }
    A.length = 0, L.clear(), N = false, I = false;
  };
  class q {
    constructor(t, r2, n2) {
      _defineProperty(this, "id", void 0), _defineProperty(this, "dep", new B()), _defineProperty(this, "deps", /* @__PURE__ */ new Map()), _defineProperty(this, "oldDeps", /* @__PURE__ */ new Map()), _defineProperty(this, "getter", void 0), _defineProperty(this, "inst", void 0), _defineProperty(this, "value", void 0), _defineProperty(this, "dirty", true), _defineProperty(this, "computed", void 0), _defineProperty(this, "cb", void 0), _defineProperty(this, "render", void 0), this.id = ++U, this.inst = t;
      var i2 = { cb: o, render: false, computed: false, immediate: false }, { computed: s2, render: l2, cb: d2, immediate: a2 } = j(j({}, i2), n2);
      this.computed = s2, this.render = l2, this.getter = "function" == typeof r2 ? r2 : () => r2.split(".").reduce((e, t2) => null == e ? void 0 : e[t2], t), this.cb = d2, s2 || (a2 ? this.run() : this.value = this.get());
    }
    get() {
      return this.dirty && (this.value = this.compute(), this.dirty = false), this.value;
    }
    compute() {
      $(this), this.oldDeps = this.deps, this.deps = /* @__PURE__ */ new Map();
      var e = this.getter.call(this.inst);
      return F(), this.cleanDeps(), e;
    }
    cleanDeps() {
      this.oldDeps.forEach((e, t) => {
        this.deps.has(t) || e.unwatch(this);
      });
    }
    addDep(e) {
      var { id: t } = e;
      this.deps.has(t) || (this.deps.set(t, e), e.watch(this));
    }
    depend() {
      M && M.addDep(this.dep);
    }
    updateAndInvoke(e) {
      var t = this.compute(), r2 = this.value;
      Object.is(t, r2) || (this.value = t, this.dirty = false, e.call(this.inst, t, r2));
    }
    update() {
      this.computed ? this.dep.watchers.size ? this.updateAndInvoke(() => {
        this.dep.notify();
      }) : this.dirty = true : ((e) => {
        var { id: t } = e;
        if (!L.has(t)) {
          if (L.add(t), N) {
            var r2 = A.findIndex((e2) => e2.id > t);
            -1 === r2 ? r2 = A.length : r2 > T && (r2 = T + 1), A.splice(r2, 0, e);
          } else
            A.push(e);
          I || (I = true, H(V));
        }
      })(this);
    }
    run() {
      this.updateAndInvoke(this.cb);
    }
  }
  class B {
    constructor() {
      _defineProperty(this, "id", void 0), _defineProperty(this, "watchers", void 0), this.id = U++, this.watchers = /* @__PURE__ */ new Set();
    }
    watch(e) {
      this.watchers.add(e);
    }
    unwatch(e) {
      this.watchers.delete(e);
    }
    notify() {
      this.watchers.forEach((e) => {
        e.update();
      });
    }
    depend() {
      M && M.addDep(this);
    }
  }
  var Q = [], $ = (e) => {
    Q.push(e), M = e;
  }, F = () => {
    Q.pop(), M = Q[Q.length - 1];
  }, G = ["path"];
  function J(e, t) {
    var r2 = Object.keys(e);
    if (Object.getOwnPropertySymbols) {
      var n2 = Object.getOwnPropertySymbols(e);
      t && (n2 = n2.filter(function(t2) {
        return Object.getOwnPropertyDescriptor(e, t2).enumerable;
      })), r2.push.apply(r2, n2);
    }
    return r2;
  }
  function K(t) {
    for (var r2 = 1; r2 < arguments.length; r2++) {
      var n2 = null != arguments[r2] ? arguments[r2] : {};
      r2 % 2 ? J(Object(n2), true).forEach(function(r3) {
        _defineProperty(t, r3, n2[r3]);
      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(n2)) : J(Object(n2)).forEach(function(e) {
        Object.defineProperty(t, e, Object.getOwnPropertyDescriptor(n2, e));
      });
    }
    return t;
  }
  function X() {
    return { current: null };
  }
  var Y = a;
  "development" === { "env": {} }.env.NODE_ENV && console.info("%cquarkc@".concat("2.0.0"), "color: white;background:#9f57f8;font-weight:bold;font-size:10px;padding:2px 6px;border-radius: 5px", "Running in dev mode.");
  var Z = (e) => !(e || false === e || 0 === e), ee = { observed: true, type: String, converter: (e, t) => {
    var r2 = e;
    switch (t) {
      case Number:
        r2 = Z(e) ? e : Number(e);
        break;
      case Boolean:
        r2 = !([null, "false", false, void 0].indexOf(e) > -1);
    }
    return r2;
  } }, te = function() {
    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
    return (t, r2) => t.constructor.createProperty(r2, e);
  }, re = () => (e, t) => e.constructor.createState(t), ie = new S(), se = new S(), le = new S(), de = new S(), ae = new S();
  function ce(e) {
    var { tag: n2, style: o2 = "" } = "string" == typeof e ? { tag: e } : e;
    return (e2) => {
      class i2 extends e2 {
        static get observedProps() {
          var t = se.get(e2);
          return t ? [...t.entries()].filter((e3) => {
            var [t2, { options: r2 }] = e3;
            return !!r2.observed;
          }) : [];
        }
        static get observedAttributes() {
          return this.observedProps.map((e3) => {
            var [t] = e3;
            return t;
          });
        }
        static isBooleanProperty(t) {
          var r2, n3 = null === (r2 = se.get(e2)) || void 0 === r2 ? void 0 : r2.get(t);
          return !!n3 && n3.options.type === Boolean;
        }
        constructor() {
          super();
          var e3 = this.attachShadow({ mode: "open" });
          if (e3)
            if ("function" == typeof CSSStyleSheet && e3.adoptedStyleSheets) {
              var n3 = new CSSStyleSheet();
              n3.replaceSync(o2), e3.adoptedStyleSheets = [n3];
            } else {
              var i3 = document.createElement("style");
              i3.innerHTML = o2, e3.append(i3);
            }
          var s2 = Object.getPrototypeOf(this.constructor), l2 = ie.get(s2);
          null != l2 && l2.size && l2.forEach((e4, t) => {
            Object.defineProperty(this, t, e4(this[t]));
          });
          var d2 = se.get(s2);
          null != d2 && d2.size && d2.forEach((e4, t) => {
            var { options: { type: n4, converter: o3 }, propName: i4 } = e4, s3 = this[i4], l3 = (e5) => !Z(e5) || n4 === Boolean && "" === e5 || Z(s3) ? r(o3) ? o3(e5, n4) : e5 : s3, d3 = new B();
            le.set(this, t, { propName: i4, dep: d3, converter: l3 }), Object.defineProperty(this, i4, { get() {
              return d3.depend(), l3(this.getAttribute(t));
            }, set(e5) {
              var i5 = e5;
              r(o3) && (i5 = o3(e5, n4)), i5 ? "boolean" == typeof i5 ? this.setAttribute(t, "") : this.setAttribute(t, i5) : this.removeAttribute(t);
            }, configurable: true, enumerable: true });
          });
          var a2 = de.get(s2);
          null != a2 && a2.size && a2.forEach((e4, t) => {
            Object.defineProperty(this, t, e4());
          });
          var c2 = ae.get(s2);
          null != c2 && c2.size && c2.forEach((e4) => {
            var { path: r2 } = e4, n4 = _objectWithoutProperties(e4, G);
            new q(this, r2, n4);
          });
        }
      }
      customElements.get(n2) || customElements.define(n2, i2);
    };
  }
  class he extends HTMLElement {
    constructor() {
      super(...arguments), _defineProperty(this, "_updatedQueue", []), _defineProperty(this, "_mounted", false), _defineProperty(this, "_renderWatcher", void 0), _defineProperty(this, "eventController", new x()), _defineProperty(this, "_controllers", void 0), _defineProperty(this, "rootPatch", (e) => {
        this.shadowRoot && function(e2, t) {
          i._root && i._root(e2, t);
          var r2 = t._children;
          e2 = t._children = l(a, null, [e2]), E(t, e2, r2 || c, void 0 !== t.ownerSVGElement, r2 ? null : t.firstChild ? n.call(t.childNodes) : null, r2 ? r2._dom : t.firstChild);
        }(e, this.shadowRoot);
      }), _defineProperty(this, "$on", (e, t, r2) => this.eventController.bindListener(r2 || this, e, t)), _defineProperty(this, "_oldVals", /* @__PURE__ */ new Map());
    }
    queueUpdated(e) {
      this._updatedQueue.push(e);
    }
    hasDidUpdateCb() {
      return this.hasOwnLifeCycleMethod("componentDidUpdate");
    }
    hasOwnLifeCycleMethod(e) {
      return Object.getPrototypeOf(this.constructor).prototype.hasOwnProperty(e);
    }
    postRender() {
      var e = this._mounted;
      if (!e) {
        this._mounted = true;
        var t = !!this._updatedQueue.length;
        if (this.hasOwnLifeCycleMethod("componentDidMount")) {
          if (t)
            return this._updatedQueue = [], void this.componentDidMount();
          this.componentDidMount();
        } else
          "development" === { "env": {} }.env.NODE_ENV && t && console.warn("by design, componentDidUpdate should not be invoked at mount phase, use componentDidMount for initialization logic instead.");
      }
      this._updatedQueue.forEach((e2) => e2()), this._updatedQueue = [], e && this.hasOwnLifeCycleMethod("componentUpdated") && this.componentUpdated();
    }
    static getStateDescriptor(e) {
      return (t) => {
        var r2, n2 = t, o2 = () => r2 || (r2 = new B());
        return { get: () => (o2().depend(), n2), set(t2) {
          var r3 = n2;
          Object.is(r3, t2) || this.shouldPreventUpdate(e, r3, t2) || (n2 = t2, o2().notify(), this.hasDidUpdateCb() && this.queueUpdated(() => {
            this.componentDidUpdate(e, r3, t2);
          }));
        }, configurable: true, enumerable: true };
      };
    }
    static createProperty(e, t) {
      var r2 = t.attribute || e;
      se.set(this, r2, { options: K(K({}, ee), t), propName: e });
    }
    static createState(e) {
      ie.set(this, e, this.getStateDescriptor(e));
    }
    static computed(e, t) {
      t.get && de.set(this, e, () => {
        var e2;
        return { configurable: true, enumerable: true, get() {
          return e2 || (e2 = new q(this, t.get, { computed: true })), e2.dep.depend(), e2.get();
        } };
      });
    }
    static watch(e, t, r2, n2) {
      var { value: o2 } = t;
      "function" == typeof o2 && ae.set(this, e, K(K({}, n2), {}, { path: r2, cb: o2 }));
    }
    _render() {
      var e = this.render();
      this.rootPatch(e);
    }
    _updateProps() {
      this.constructor.observedProps.forEach((e) => {
        var [t, { propName: r2 }] = e;
        this[r2] = this.getAttribute(t);
      });
    }
    addController(e) {
      var t, r2;
      ((null !== (t = this._controllers) && void 0 !== t ? t : this._controllers = /* @__PURE__ */ new Set()).add(e), this.shadowRoot && this.isConnected) && (null === (r2 = e.hostConnected) || void 0 === r2 || r2.call(e));
    }
    removeController(e) {
      var t;
      null === (t = this._controllers) || void 0 === t || t.delete(e);
    }
    requestUpdate() {
      this.getOrInitRenderWatcher().update();
    }
    update() {
      this.getOrInitRenderWatcher().update();
    }
    $emit(e, t) {
      return this.dispatchEvent(new CustomEvent(e, Object.assign({ bubbles: true }, t)));
    }
    $nextTick(e) {
      return H(e, this);
    }
    componentDidMount() {
    }
    componentWillUnmount() {
    }
    shouldComponentUpdate(e, t, r2) {
      return t !== r2;
    }
    shouldPreventUpdate(e, t, r2) {
      return !!this.hasOwnLifeCycleMethod("shouldComponentUpdate") && !this.shouldComponentUpdate(e, t, r2);
    }
    componentDidUpdate(e, t, r2) {
    }
    componentUpdated() {
    }
    render() {
      return "";
    }
    getOrInitRenderWatcher() {
      return this._renderWatcher || (this._renderWatcher = new q(this, () => {
        var e;
        this._render();
        var t = this._mounted ? "hostUpdated" : "hostMounted";
        null === (e = this._controllers) || void 0 === e || e.forEach((e2) => {
          var r2;
          return null === (r2 = e2[t]) || void 0 === r2 ? void 0 : r2.call(e2);
        }), this.postRender();
      }, { render: true })), this._renderWatcher;
    }
    connectedCallback() {
      var e;
      this._updateProps(), null === (e = this._controllers) || void 0 === e || e.forEach((e2) => {
        var t;
        return null === (t = e2.hostConnected) || void 0 === t ? void 0 : t.call(e2);
      }), this.getOrInitRenderWatcher();
    }
    attributeChangedCallback(e, t, n2) {
      var o2, i2 = null === (o2 = le.get(this)) || void 0 === o2 ? void 0 : o2.get(e);
      if (i2) {
        var { propName: s2 } = i2;
        if (n2 !== t && this.constructor.isBooleanProperty(e) && "false" === n2)
          return r(this.componentDidUpdate) && this._oldVals.set(s2, t), void (this[s2] = n2);
        var l2 = this[s2], d2 = t, a2 = this._oldVals.get(s2);
        a2 && (this._oldVals.delete(s2), d2 = a2), d2 = i2.converter(d2), this.shouldPreventUpdate(s2, d2, l2) || (i2.dep.notify(), this.hasDidUpdateCb() && this.queueUpdated(() => {
          this.componentDidUpdate(s2, d2, l2);
        }));
      }
    }
    disconnectedCallback() {
      var e;
      r(this.componentWillUnmount) && this.componentWillUnmount(), this.eventController.removeAllListener(), null === (e = this._controllers) || void 0 === e || e.forEach((e2) => {
        var t;
        return null === (t = e2.hostDisconnected) || void 0 === t ? void 0 : t.call(e2);
      }), this.rootPatch(null), this._mounted = false;
    }
  }
  _defineProperty(he, "h", l), _defineProperty(he, "Fragment", Y);
  const addLineCommaRegex = new RegExp("(?<!(\\s*\\,\\s*)|([\\[\\{\\}]\\s*))\\n(?!\\s*\\}\\s*)", "gm");
  const strVarRegex = new RegExp(`((?<!\\\\)\\"|\\')(.*?)((?<!\\\\)\\1)`, "gm");
  const badKeyRegex = new RegExp('([\\s\\[\\,\\{\\b]{1})(?<!\\"])(\\w+)(?!\\")(\\s*\\:)', "gm");
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
    resultStr = resultStr.replaceAll(strVarRegex, (s2, begin, value, end) => {
      return `"${encodeURI(value)}"`;
    });
    resultStr = resultStr.replaceAll(badKeyRegex, (s2, p1, value, p2) => {
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
    let nodes2 = safeParseJson(content.trim(), (key, value) => {
      if (typeof value == "object" && !Array.isArray(value)) {
        value.open = value.open == void 0 ? true : value.open;
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
    nodes2 = Array.isArray(nodes2) ? nodes2 : [nodes2];
    return nodes2;
  }
  function parseStyleString(str, vars) {
    let style2 = str;
    if (!style2 || style2.trim().length == 0)
      return { style: "", classs: [] };
    const classList = [];
    const varRegex = new RegExp("(?<!:)(([#\\.]{1}\\w+))\\s*;(?!:)", "g");
    if (style2.startsWith("{"))
      style2 = style2.substring(1);
    if (style2.endsWith("}"))
      style2 = style2.substring(0, style2.length - 1);
    if (!style2.trim().endsWith(";"))
      style2 = style2.trim() + ";";
    style2 = style2.replace(varRegex, (matched, key) => {
      if (key in vars) {
        let r2 = vars[key];
        if (!r2.endsWith(";"))
          r2 = r2 + ";";
        return r2;
      } else if (key.startsWith("#")) {
        return "";
      } else if (matched.startsWith(".")) {
        classList.push(key.substring(1));
        return "";
      }
      return matched;
    });
    return { style: style2, classs: classList };
  }
  function StyledString(str, styles) {
    if (typeof str !== "string")
      return { style: "", value: str || "" };
    const styleRegex = /^\{(.*?)\}/g;
    let style2 = "", classs = [];
    let value = str.replace(styleRegex, (matched, css) => {
      const result = parseStyleString(css, styles);
      style2 = result.style;
      classs.push(...result.classs);
      return "";
    });
    const iconRegex = /\[([\w\.\-\_]+)\]/g;
    value = value.replace(iconRegex, (matched, iconName) => {
      return `<span data-lite-tree class="icon ${iconName}"></span>`;
    });
    return { value, style: style2, classs };
  }
  function clearPrefixSpace(lines, indent = 4) {
    const minSpaceCount = lines.reduce((count, line, index) => {
      var _a;
      line = line.replace(/\t/g, " ".repeat(indent));
      lines[index] = line;
      const spaceCount = ((_a = line.match(/^\s+/)) == null ? void 0 : _a[0].length) || 0;
      return count == -1 ? spaceCount : spaceCount < count ? spaceCount : count;
    }, -1);
    lines.forEach((line, index) => {
      lines[index] = line.substring(minSpaceCount);
    });
  }
  const nodeRegex = /(\+|\-)?\s*(\[([^\[\]]+?)\])?\s*(\/?[^\(\/\\]+\/?)(\((.*?)\))?\s*(\/\/(\S+)?\s*(.*?))?$/gm;
  const nodeTagsRegex = /([^,]+)\,?/g;
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
      let node = { id: void 0, open: false, title: "", tags: [], comment: "", style: "", icon: "", level: 0, flag: "", classs: [] };
      nodeRegex.lastIndex = 0;
      const match = nodeRegex.exec(line.trim());
      if (match) {
        node.open = match[1] == "+" ? false : true;
        node.icon = match[3] || "";
        node.title = match[4] || "";
        node.tags = parseTags(match[6]);
        node.comment = match[9] || "";
        const flagMatch = /([\[\]\w\!\+\*\&\-\=\$\%\@\~\.]+)?(\{[\s\S]*?\})?/g.exec(match[8] || "");
        if (flagMatch) {
          const f2 = (flagMatch[1] || "").split(".");
          node.flag = f2[0];
          const r2 = parseStyleString(flagMatch[2] || "", vars.styles);
          node.style = r2.style;
          node.classs = [...r2.classs, ...f2.slice(1)];
        }
      }
      return node;
    }
    const preSpace = (lines[0].match(/^\s+/) || [""])[0];
    let previousNode = void 0;
    let parentNode = void 0;
    let rootNode = { level: 0, children: [] };
    const stackNodes = [rootNode];
    clearPrefixSpace(lines, opts.indent);
    for (let line of lines) {
      const trimLine = line.trim();
      if (trimLine == "" || trimLine.startsWith("//"))
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
        for (let i2 = stackNodes.length - 1; i2 >= 0; i2--) {
          if (stackNodes[i2].level >= node.level) {
            stackNodes.pop();
          } else {
            parentNode = stackNodes[i2];
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
  const flagAlias = {
    "+": "diff-add",
    "-": "diff-delete",
    "*": "diff-modify",
    "!": ["important", "[important]"],
    "x": ["error", "[no]"],
    "v": ["correct", "[yes]"]
  };
  function setObjectDefaultValue(target, src) {
    if (typeof src != "object" || typeof target != "object")
      return;
    Object.entries(src).forEach(([key, value]) => {
      if (!(key in target) || target[key] == void 0) {
        target[key] = value;
      }
    });
  }
  function getTreeFormat(treeData) {
    if (treeData.startsWith("[") && treeData.endsWith("]") || treeData.startsWith("{") && treeData.endsWith("}")) {
      return "json";
    } else {
      return "lite";
    }
  }
  const SplitterRegex = /^\s*[-]{3,}\s*$/gm;
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
    const icons = {};
    const varRegex = /^\s*([\w\#\.]+)\s*\=\s*((\{([\w\n\S\s]*?)\})|(\<svg[\w\n\S\s]*?<\/svg\>)|(.*$))/gm;
    let matched;
    while ((matched = varRegex.exec(str)) !== null) {
      if (matched.index === varRegex.lastIndex) {
        varRegex.lastIndex++;
      }
      const key = matched[1].trim();
      let value = matched[4] || matched[5] || matched[6];
      if (value.startsWith("<svg") || value.startsWith("data:image/svg+xml;")) {
        icons[key] = value;
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
    return { styles, classs, icons };
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
      treeData = [{ id: "", title: `解析错误:${e.message}`, icon: "error", open: true, level: 0, flag: "", classs: [""], comment: e.message, style: "", tags: [] }];
    }
    return treeData;
  }
  function removeCommentWrapper(str) {
    return str.replace(/^\s*<!--/, "").replace(/-->\s*$/, "");
  }
  let NodeIndex = 0;
  function parseTree(context, options) {
    const opts = Object.assign({}, options);
    const [strVars, strTree] = splitTreeContent(removeCommentWrapper(context));
    if (!opts.format)
      opts.format = getTreeFormat(strTree);
    const vars = parseVars(strVars);
    let hasFlag = false;
    try {
      const nodes2 = parseTreeObject(strTree, vars, {
        ...opts,
        forEach: (node) => {
          const flag = node.flag;
          if (flag && flag.length > 0) {
            hasFlag = true;
            if (flag in flagAlias) {
              const f2 = flagAlias[flag];
              if (typeof f2 === "string") {
                node.classs.push(f2);
              } else if (Array.isArray(f2)) {
                node.classs.push(f2[0]);
                node.flag = f2[1];
              }
            }
          }
          setObjectDefaultValue(node, {
            id: String(++NodeIndex),
            title: "Node",
            icon: "",
            open: true,
            level: 0,
            flag: "",
            comment: "",
            style: "",
            classs: [],
            tags: []
          });
          if (typeof opts.forEach === "function") {
            opts.forEach(node);
          }
        }
      });
      return {
        ...vars,
        hasFlag,
        nodes: nodes2
      };
    } catch (e) {
      console.error(e);
      nodes = [{
        title: "Invalid data provided to LiteTree",
        style: "color:red",
        // @ts-ignore
        children: [{ title: e.message, style: "color:red" }]
      }];
    }
  }
  function randomId(len = 10) {
    return Math.random().toString(36).substring(2, len + 2);
  }
  function enableScoped(css, scopeId) {
    const regex = new RegExp("(?<=\\}|^)([^\\{\\}]+)(?=\\{)", "gm");
    return css.replace(regex, (match, rules) => {
      return rules.split(",").map((r2) => {
        r2 = r2.trim();
        if (r2.startsWith("@"))
          return r2;
        const i2 = r2.indexOf(":");
        if (i2 == -1) {
          return "\n" + r2 + `[${scopeId}]`;
        } else {
          return "\n" + r2.slice(0, i2) + `[${scopeId}]` + r2.slice(i2);
        }
      }).join(",");
    });
  }
  function injectStylesheet(css, options) {
    if (globalThis.document == void 0)
      return;
    const { id, mode, scoped = true, location = "head" } = Object.assign({ mode: "default" }, options);
    let style2 = document.head.querySelector(`#${id}`);
    let scopeId;
    if (!style2) {
      if (scoped) {
        scopeId = scoped == true ? randomId() : scoped;
        css = enableScoped(css, scopeId);
      }
      style2 = document.createElement("style");
      style2.innerHTML = css;
      style2.id = id;
      if (options == null ? void 0 : options.el) {
        options.el.appendChild(style2);
      } else if (location == "head") {
        document.head.appendChild(style2);
      } else {
        document.body.appendChild(style2);
      }
      return style2;
    }
    if (mode == "replace") {
      style2.innerHTML = css;
    } else if (mode == "append") {
      style2.innerHTML += css;
    }
    return scopeId;
  }
  function enableImportant(css) {
    return css.replace(/(.*?)(\s*;)/g, (matched, p1, p2) => {
      if (p1.trim().endsWith("!important"))
        return matched;
      return p1.trim() + "!important;";
    });
  }
  function createSvgIconContainer(loc) {
    if (globalThis.document == void 0)
      return;
    let svgContainer = loc.querySelector("#lite_tree_icons");
    if (!svgContainer) {
      svgContainer = document.createElement("style");
      svgContainer.id = "lite_tree_icons";
      svgContainer.innerHTML = `.lite-tree .icon{
            display:inline-block;
            width:1em;
            height:1em;
            margin:0.2em;
        }`;
      if (loc) {
        loc.appendChild(svgContainer);
      } else {
        document.head.appendChild(svgContainer);
      }
    }
    return svgContainer;
  }
  const compressRegex = /(\<\?xml(.*)?\?\>)|(\<\!DOCTYPE.*?\>)|(width\=\"\d+\"\s?)|(height\=\"\d+\"\s?)|(\bxmlns(\:\w+)?\=\".*?\"\s?)|(p\-id\=\"\d+\"\s?)|(t\=\"\d+\"\s?)|(version\=\".*?\"\s?)|(class\=\"\w+\"\s?)/gm;
  function compressSvgData(svgData) {
    return svgData.replace(compressRegex, "");
  }
  function injectSvgIcons(svgIcons, loc) {
    if (globalThis.document == void 0)
      return;
    const svgIconContainer = createSvgIconContainer(loc);
    for (let [name, define2] of Object.entries(svgIcons)) {
      const iconClassName = `.icon.${name}`;
      const isSvg = define2.startsWith("<svg");
      const svgData = isSvg ? compressSvgData(define2).replaceAll("<", "%3C").replaceAll(">", "%3E").replaceAll('"', "'") : define2;
      const iconStyle = `.lite-tree ${iconClassName}{
            mask-image: url("${isSvg ? `data:image/svg+xml,${svgData}` : svgData}");            
            -webkit-mask-image: url("${isSvg ? `data:image/svg+xml,${svgData}` : svgData}");
            -moz-mask-image: url("${isSvg ? `data:image/svg+xml,${svgData}` : svgData}");
        }`;
      if (svgIconContainer.innerHTML.includes(`.lite-tree ${iconClassName}`))
        continue;
      svgIconContainer.innerHTML = svgIconContainer.innerHTML + "\n" + iconStyle;
    }
  }
  function toStyleObject(css) {
    const style2 = {};
    (css || "").split(";").forEach((item) => {
      if (item.trim().length > 0) {
        let [key, ...values] = item.split(":");
        key = key.replace(/-([a-z])/g, (_2, letter) => letter.toUpperCase());
        style2[key.trim()] = values.join(":");
      }
    });
    return style2;
  }
  function parseLinks(content) {
    const regex = /\[([^\[\]]*?)(\:(\w+))?\]\((([^\(\\\s)]+)(\s+[\w\u4e00-\u9fa5\w]+)?)\)/g;
    const result = content.replace(regex, (matched, label, _1, icon, _2, link, tips) => {
      return `<a style='display:inline-flex;align-items:center;' ${tips ? "title=" + tips : ""} class='action' target='_blank' href='${link}'>${icon ? `<span class='icon ${icon}'></span>` : ""}${label}</a>`;
    });
    return result;
  }
  function injectCustomStyles(classs, el) {
    injectStylesheet(`        
        ${Object.keys(classs).map((k2) => `.lite-tree ${k2} { ${enableImportant(classs[k2])} }`).join("\n")} 
    `, { id: "lite-tree-custom-styles", mode: "replace", el });
  }
  function getIcon(node) {
    const icon = String(node.icon).trim();
    if (icon.length > 0)
      return node.icon;
    if (node.children && node.children.length > 0) {
      const isOpen = node.open == void 0 ? true : node.open;
      return isOpen ? "folder-open" : "folder";
    }
    const title = node.title.trim();
    if (title.endsWith("/")) {
      node.icon = "folder";
      node.title = title.slice(0, -1);
      return "folder";
    }
    return "file";
  }
  function handleNodeClick(e, emit) {
    const target = e.target;
    const nodeEle = target.closest(".lite-tree-node");
    if (nodeEle) {
      const nodeId = nodeEle.getAttribute("data-node-id");
      const param = {
        position: "node",
        node: nodeId,
        element: target
      };
      if (target.classList.contains("tag")) {
        param.position = "tag";
      } else if (target.classList.contains("flag")) {
        param.position = "flag";
      } else if (target.classList.contains("comment")) {
        param.position = "comment";
      } else if (target.classList.contains("action")) {
        param.position = "action";
      } else if (target.closest("span.title")) {
        param.position = "title";
      } else if (target.closest("span.flag")) {
        param.position = "flag";
      }
      emit(param);
      e.stopPropagation();
    }
  }
  function getDefaultExportFromCjs(x2) {
    return x2 && x2.__esModule && Object.prototype.hasOwnProperty.call(x2, "default") ? x2["default"] : x2;
  }
  var classnames$1 = { exports: {} };
  /*!
  	Copyright (c) 2018 Jed Watson.
  	Licensed under the MIT License (MIT), see
  	http://jedwatson.github.io/classnames
  */
  (function(module) {
    (function() {
      var hasOwn = {}.hasOwnProperty;
      function classNames() {
        var classes = "";
        for (var i2 = 0; i2 < arguments.length; i2++) {
          var arg = arguments[i2];
          if (arg) {
            classes = appendClass(classes, parseValue(arg));
          }
        }
        return classes;
      }
      function parseValue(arg) {
        if (typeof arg === "string" || typeof arg === "number") {
          return arg;
        }
        if (typeof arg !== "object") {
          return "";
        }
        if (Array.isArray(arg)) {
          return classNames.apply(null, arg);
        }
        if (arg.toString !== Object.prototype.toString && !arg.toString.toString().includes("[native code]")) {
          return arg.toString();
        }
        var classes = "";
        for (var key in arg) {
          if (hasOwn.call(arg, key) && arg[key]) {
            classes = appendClass(classes, key);
          }
        }
        return classes;
      }
      function appendClass(value, newClass) {
        if (!newClass) {
          return value;
        }
        if (value) {
          return value + " " + newClass;
        }
        return value + newClass;
      }
      if (module.exports) {
        classNames.default = classNames;
        module.exports = classNames;
      } else {
        window.classNames = classNames;
      }
    })();
  })(classnames$1);
  var classnamesExports = classnames$1.exports;
  const classnames = /* @__PURE__ */ getDefaultExportFromCjs(classnamesExports);
  const style = ':host {\n  --lite-tree-icon-file: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxZW0iIGhlaWdodD0iMWVtIiB2aWV3Qm94PSIwIDAgMjU2IDI1NiI+PHBhdGggZmlsbD0iY3VycmVudENvbG9yIiBkPSJtMjEzLjY2IDgyLjM0bC01Ni01NkE4IDggMCAwIDAgMTUyIDI0SDU2YTE2IDE2IDAgMCAwLTE2IDE2djE3NmExNiAxNiAwIDAgMCAxNiAxNmgxNDRhMTYgMTYgMCAwIDAgMTYtMTZWODhhOCA4IDAgMCAwLTIuMzQtNS42Nk0xNjAgNTEuMzFMMTg4LjY5IDgwSDE2MFpNMjAwIDIxNkg1NlY0MGg4OHY0OGE4IDggMCAwIDAgOCA4aDQ4eiIvPjwvc3ZnPg==");\n  --lite-tree-icon-folder: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxZW0iIGhlaWdodD0iMWVtIiB2aWV3Qm94PSIwIDAgMjQgMjQiPjxwYXRoIGZpbGw9Im5vbmUiIHN0cm9rZT0iY3VycmVudENvbG9yIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIHN0cm9rZS13aWR0aD0iMiIgZD0iTTUgNGg0bDMgM2g3YTIgMiAwIDAgMSAyIDJ2OGEyIDIgMCAwIDEtMiAySDVhMiAyIDAgMCAxLTItMlY2YTIgMiAwIDAgMSAyLTIiLz48L3N2Zz4=");\n  --lite-tree-icon-folder-open: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxZW0iIGhlaWdodD0iMWVtIiB2aWV3Qm94PSIwIDAgMjQgMjQiPjxwYXRoIGZpbGw9Im5vbmUiIHN0cm9rZT0iY3VycmVudENvbG9yIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIHN0cm9rZS13aWR0aD0iMiIgZD0ibTUgMTlsMi43NTctNy4zNTFBMSAxIDAgMCAxIDguNjkzIDExSDIxYTEgMSAwIDAgMSAuOTg2IDEuMTY0bC0uOTk2IDUuMjExQTIgMiAwIDAgMSAxOS4wMjYgMTl6YTIgMiAwIDAgMS0yLTJWNmEyIDIgMCAwIDEgMi0yaDRsMyAzaDdhMiAyIDAgMCAxIDIgMnYyIi8+PC9zdmc+");\n  --lite-tree-icon-arrow: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxZW0iIGhlaWdodD0iMWVtIiB2aWV3Qm94PSIwIDAgMzIgMzIiPjxwYXRoIGZpbGw9IiNhYmFiYWIiIGQ9Im0xMiA4bDEwIDhsLTEwIDh6Ii8+PC9zdmc+");\n  --lite-tree-icon-tag: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxZW0iIGhlaWdodD0iMWVtIiB2aWV3Qm94PSIwIDAgMzIgMzIiPjxwYXRoIGZpbGw9ImN1cnJlbnRDb2xvciIgZD0iTTEwIDE0YTQgNCAwIDEgMSA0LTRhNC4wMDUgNC4wMDUgMCAwIDEtNCA0Wm0wLTZhMiAyIDAgMSAwIDEuOTk4IDIuMDA0QTIuMDAyIDIuMDAyIDAgMCAwIDEwIDhaIi8+PHBhdGggZmlsbD0iY3VycmVudENvbG9yIiBkPSJNMTYuNjQ0IDI5LjQxNUwyLjU4NiAxNS4zNTRBMiAyIDAgMCAxIDIgMTMuOTQxVjRhMiAyIDAgMCAxIDItMmg5Ljk0MWEyIDIgMCAwIDEgMS40MTQuNTg2bDE0LjA2IDE0LjA1OGEyIDIgMCAwIDEgMCAyLjgyOGwtOS45NDMgOS45NDNhMiAyIDAgMCAxLTIuODI5IDBaTTQgNHY5Ljk0MkwxOC4wNTggMjhMMjggMTguMDU4TDEzLjk0MiA0WiIvPjwvc3ZnPg==");\n  --lite-tree-icon-checked: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxZW0iIGhlaWdodD0iMWVtIiB2aWV3Qm94PSIwIDAgMjEgMjEiPjxnIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCIgc3Ryb2tlPSJjdXJyZW50Q29sb3IiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCI+PHBhdGggZD0iTTUuNSAzLjVoMTBhMiAyIDAgMCAxIDIgMnYxMGEyIDIgMCAwIDEtMiAyaC0xMGEyIDIgMCAwIDEtMi0ydi0xMGEyIDIgMCAwIDEgMi0yIi8+PHBhdGggZD0ibTcuNSAxMC41bDIgMmw0LTQiLz48L2c+PC9zdmc+");\n  --lite-tree-icon-unchecked: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxZW0iIGhlaWdodD0iMWVtIiB2aWV3Qm94PSIwIDAgMjEgMjEiPjxwYXRoIGZpbGw9Im5vbmUiIHN0cm9rZT0iY3VycmVudENvbG9yIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGQ9Ik01LjUgMy41aDEwYTIgMiAwIDAgMSAyIDJ2MTBhMiAyIDAgMCAxLTIgMmgtMTBhMiAyIDAgMCAxLTItMnYtMTBhMiAyIDAgMCAxIDItMiIvPjwvc3ZnPg==");\n  --lite-tree-icon-star: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxZW0iIGhlaWdodD0iMWVtIiB2aWV3Qm94PSIwIDAgMjQgMjQiPjxwYXRoIGZpbGw9ImN1cnJlbnRDb2xvciIgZD0ibTIyIDkuMjRsLTcuMTktLjYyTDEyIDJMOS4xOSA4LjYzTDIgOS4yNGw1LjQ2IDQuNzNMNS44MiAyMUwxMiAxNy4yN0wxOC4xOCAyMWwtMS42My03LjAzek0xMiAxNS40bC0zLjc2IDIuMjdsMS00LjI4bC0zLjMyLTIuODhsNC4zOC0uMzhMMTIgNi4xbDEuNzEgNC4wNGw0LjM4LjM4bC0zLjMyIDIuODhsMSA0LjI4eiIvPjwvc3ZnPg==");\n  --lite-tree-icon-yes: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxZW0iIGhlaWdodD0iMWVtIiB2aWV3Qm94PSIwIDAgNDggNDgiPjxwYXRoIGZpbGw9Im5vbmUiIHN0cm9rZT0iY3VycmVudENvbG9yIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIHN0cm9rZS13aWR0aD0iNCIgZD0ibTQgMjRsNS01bDEwIDEwTDM5IDlsNSA1bC0yNSAyNXoiIGNsaXAtcnVsZT0iZXZlbm9kZCIvPjwvc3ZnPg==");\n  --lite-tree-icon-no: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxZW0iIGhlaWdodD0iMWVtIiB2aWV3Qm94PSIwIDAgMjQgMjQiPjxnIGZpbGw9Im5vbmUiIHN0cm9rZT0iY3VycmVudENvbG9yIiBzdHJva2UtZGFzaGFycmF5PSIyMiIgc3Ryb2tlLWRhc2hvZmZzZXQ9IjIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS13aWR0aD0iMiI+PHBhdGggZD0iTTE5IDVMNSAxOSI+PGFuaW1hdGUgZmlsbD0iZnJlZXplIiBhdHRyaWJ1dGVOYW1lPSJzdHJva2UtZGFzaG9mZnNldCIgYmVnaW49IjAuM3MiIGR1cj0iMC4zcyIgdmFsdWVzPSIyMjswIi8+PC9wYXRoPjxwYXRoIGQ9Ik01IDVMMTkgMTkiPjxhbmltYXRlIGZpbGw9ImZyZWV6ZSIgYXR0cmlidXRlTmFtZT0ic3Ryb2tlLWRhc2hvZmZzZXQiIGR1cj0iMC4zcyIgdmFsdWVzPSIyMjswIi8+PC9wYXRoPjwvZz48L3N2Zz4=");\n  --lite-tree-icon-important: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxZW0iIGhlaWdodD0iMWVtIiB2aWV3Qm94PSIwIDAgMjQgMjQiPjxwYXRoIGZpbGw9ImN1cnJlbnRDb2xvciIgZD0iTTEyIDIuMDAyYTMuODc1IDMuODc1IDAgMCAwLTMuODc1IDMuODc1YzAgMi45MiAxLjIwNyA2LjU1MiAxLjgxMyA4LjE5OWEyLjE4NyAyLjE4NyAwIDAgMCAyLjA2NCAxLjQyM2MuOTA0IDAgMS43MzktLjU0MiAyLjA2My0xLjQxOGMuNjA2LTEuNjQgMS44MS01LjI1NCAxLjgxLTguMjA0QTMuODc1IDMuODc1IDAgMCAwIDEyIDIuMDAyTTkuNjI1IDUuODc3YTIuMzc1IDIuMzc1IDAgMCAxIDQuNzUgMGMwIDIuNjU1LTEuMTExIDYuMDQzLTEuNzE3IDcuNjg0YS42ODYuNjg2IDAgMCAxLS42NTUuNDM4YS42ODcuNjg3IDAgMCAxLS42NTctLjQ0Yy0uNjA3LTEuNjUyLTEuNzIxLTUuMDU4LTEuNzIxLTcuNjgybTIuMzc2IDExLjEyNGEyLjUwMSAyLjUwMSAwIDEgMCAwIDUuMDAyYTIuNTAxIDIuNTAxIDAgMCAwIDAtNS4wMDJNMTEgMTkuNTAyYTEuMDAxIDEuMDAxIDAgMSAxIDIuMDAyIDBhMS4wMDEgMS4wMDEgMCAwIDEtMi4wMDIgMCIvPjwvc3ZnPg==");\n}\n.lite-tree .icon {\n  background-color: currentColor;\n  mask-size: cover;\n  -webkit-mask-size: cover;\n}\n.lite-tree .icon.file {\n  mask-image: var(--lite-tree-icon-file);\n  -webkit-mask-image: var(--lite-tree-icon-file);\n  -moz-mask-image: var(--lite-tree-icon-file);\n}\n.lite-tree .icon.folder {\n  mask-image: var(--lite-tree-icon-folder);\n  -webkit-mask-image: var(--lite-tree-icon-folder);\n  -moz-mask-image: var(--lite-tree-icon-folder);\n}\n.lite-tree .icon.folder-open {\n  mask-image: var(--lite-tree-icon-folder-open);\n  -webkit-mask-image: var(--lite-tree-icon-folder-open);\n  -moz-mask-image: var(--lite-tree-icon-folder-open);\n}\n.lite-tree .icon.arrow {\n  mask-image: var(--lite-tree-icon-arrow);\n  -webkit-mask-image: var(--lite-tree-icon-arrow);\n  -moz-mask-image: var(--lite-tree-icon-arrow);\n}\n.lite-tree .icon.tag {\n  mask-image: var(--lite-tree-icon-tag);\n  -webkit-mask-image: var(--lite-tree-icon-tag);\n  -moz-mask-image: var(--lite-tree-icon-tag);\n}\n.lite-tree .icon.checked {\n  mask-image: var(--lite-tree-icon-checked);\n  -webkit-mask-image: var(--lite-tree-icon-checked);\n  -moz-mask-image: var(--lite-tree-icon-checked);\n}\n.lite-tree .icon.unchecked {\n  mask-image: var(--lite-tree-icon-unchecked);\n  -webkit-mask-image: var(--lite-tree-icon-unchecked);\n  -moz-mask-image: var(--lite-tree-icon-unchecked);\n}\n.lite-tree .icon.star {\n  mask-image: var(--lite-tree-icon-star);\n  -webkit-mask-image: var(--lite-tree-icon-star);\n  -moz-mask-image: var(--lite-tree-icon-star);\n}\n.lite-tree .icon.yes {\n  mask-image: var(--lite-tree-icon-yes);\n  -webkit-mask-image: var(--lite-tree-icon-yes);\n  -moz-mask-image: var(--lite-tree-icon-yes);\n}\n.lite-tree .icon.no {\n  mask-image: var(--lite-tree-icon-no);\n  -webkit-mask-image: var(--lite-tree-icon-no);\n  -moz-mask-image: var(--lite-tree-icon-no);\n}\n.lite-tree .icon.important {\n  mask-image: var(--lite-tree-icon-important);\n  -webkit-mask-image: var(--lite-tree-icon-important);\n  -moz-mask-image: var(--lite-tree-icon-important);\n}\n.lite-tree {\n  position: relative;\n  padding: 8px;\n  border: 1px solid #eee;\n  text-align: left;\n  width: 100%;\n  box-sizing: border-box;\n  overflow-y: auto;\n  overflow-x: hidden;\n}\n.lite-tree .richlabel {\n  display: inline-flex;\n}\n.lite-tree .icon {\n  display: inline-block;\n  width: 1em;\n  height: 1em;\n  margin: 0.2em;\n}\n.lite-tree::-webkit-scrollbar {\n  width: 4px;\n  height: 1px;\n}\n.lite-tree::-webkit-scrollbar-thumb {\n  border-radius: 10px;\n  background-color: #b1b1b1;\n}\n.lite-tree::-webkit-scrollbar-track {\n  background: #ededed;\n  border-radius: 10px;\n}\n.lite-tree .lite-tree-nodes {\n  color: #555;\n  display: flex;\n  flex-direction: column;\n  list-style: none !important;\n  padding: 0px;\n  margin: 0px;\n}\n.lite-tree .lite-tree-nodes > li {\n  margin: 0px;\n}\n.lite-tree .lite-tree-nodes > li > span.lite-tree-node {\n  cursor: pointer;\n  display: flex;\n  width: 100%;\n  box-sizing: border-box;\n  padding: 4px;\n  margin: 0px;\n  align-items: center;\n  position: relative;\n}\n.lite-tree .lite-tree-nodes > li > span.lite-tree-node.diff-add {\n  background-color: #f3ffec;\n  color: green;\n}\n.lite-tree .lite-tree-nodes > li > span.lite-tree-node.diff-modify {\n  background-color: #fff6e9;\n  color: orange;\n}\n.lite-tree .lite-tree-nodes > li > span.lite-tree-node.diff-delete {\n  background-color: #ffeaea;\n  color: red!important;\n}\n.lite-tree .lite-tree-nodes > li > span.lite-tree-node.important {\n  background-color: #d7f0ff;\n  color: #037be5 !important;\n  font-weight: bold;\n}\n.lite-tree .lite-tree-nodes > li > span.lite-tree-node.correct {\n  background-color: #f3ffec;\n  color: green!important;\n}\n.lite-tree .lite-tree-nodes > li > span.lite-tree-node.error {\n  background-color: #ffeaea;\n  color: red!important;\n}\n.lite-tree .lite-tree-nodes > li > span.lite-tree-node > span.flag {\n  width: 1.2em;\n  text-align: center;\n}\n.lite-tree .lite-tree-nodes > li > span.lite-tree-node > span.title {\n  flex-grow: 1;\n  padding-right: 4px;\n  display: inline-flex;\n  align-items: center;\n}\n.lite-tree .lite-tree-nodes > li > span.lite-tree-node > span.title > span.tag {\n  background-color: #eee;\n  box-sizing: border-box;\n  color: #333;\n  padding: 2px 4px;\n  border-radius: 4px;\n  border: 1px solid #ddd;\n  margin-left: 2px;\n  margin-right: 2px;\n  font-size: 1em;\n  height: 1.5em;\n  align-items: center;\n}\n.lite-tree .lite-tree-nodes > li > span.lite-tree-node > span.title > span.tag span.icon {\n  font-size: 1em;\n}\n.lite-tree .lite-tree-nodes > li > span.lite-tree-node > span.comment {\n  color: #bbb;\n  display: inline-flex;\n}\n@media screen and (max-width: 480px) {\n  .lite-tree .lite-tree-nodes > li > span.lite-tree-node > span.comment {\n    display: none;\n  }\n}\n.lite-tree .lite-tree-nodes > li > span.lite-tree-node > span.opener {\n  width: 1em;\n  height: 1em;\n  transform-origin: 0.5em center;\n  transform: rotate(0deg);\n  transition: all 0.2s;\n}\n.lite-tree .lite-tree-nodes > li > span.lite-tree-node > span.opener.open {\n  transform-origin: 0.5em center;\n  transform: rotate(90deg);\n  transition: all 0.2s;\n}\n.lite-tree .lite-tree-nodes > li > span.lite-tree-node:hover {\n  background-color: #f8f8f8;\n  border-radius: 4px;\n}\n.dark .lite-tree {\n  border: 1px solid #1a1a1a;\n}\n.dark .lite-tree::-webkit-scrollbar-thumb {\n  background-color: #555;\n}\n.dark .lite-tree::-webkit-scrollbar-track {\n  background: black;\n}\n.dark .lite-tree .lite-tree-nodes {\n  color: #999;\n}\n.dark .lite-tree .lite-tree-nodes > li {\n  margin: 0px;\n}\n.dark .lite-tree .lite-tree-nodes > li > span.lite-tree-node.diff-add {\n  background-color: #212121;\n  color: #00d500 !important;\n}\n.dark .lite-tree .lite-tree-nodes > li > span.lite-tree-node.diff-modify {\n  background-color: #212121;\n}\n.dark .lite-tree .lite-tree-nodes > li > span.lite-tree-node.diff-delete {\n  background-color: #212121;\n}\n.dark .lite-tree .lite-tree-nodes > li > span.lite-tree-node.important {\n  background-color: #212121;\n}\n.dark .lite-tree .lite-tree-nodes > li > span.lite-tree-node.correct {\n  background-color: #212121;\n  color: #00d500 !important;\n}\n.dark .lite-tree .lite-tree-nodes > li > span.lite-tree-node.error {\n  background-color: #212121;\n}\n.dark .lite-tree .lite-tree-nodes > li > span.lite-tree-node > span.title > span.tag {\n  background-color: #212121;\n  color: #aaa;\n  border: 1px solid #333;\n}\n.dark .lite-tree .lite-tree-nodes > li > span.lite-tree-node > span.comment {\n  color: #bbb;\n}\n.dark .lite-tree .lite-tree-nodes > li > span.lite-tree-node:hover {\n  background-color: #333;\n}\n.slidedown {\n  overflow: hidden;\n  position: relative;\n  display: flex;\n  flex-direction: column;\n  width: 100%;\n  transition: height 0.2s ease-in-out;\n}\n.slidedown.closed {\n  height: 0px;\n}\n';
  var __defProp2 = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __decorateClass = (decorators, target, key, kind) => {
    var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
    for (var i2 = decorators.length - 1, decorator; i2 >= 0; i2--)
      if (decorator = decorators[i2])
        result = (kind ? decorator(target, key, result) : decorator(result)) || result;
    if (kind && result)
      __defProp2(target, key, result);
    return result;
  };
  let LiteTree = class extends he {
    constructor() {
      super();
      __publicField(this, "indent", 4);
      __publicField(this, "format", "lite");
      //是否显示标识
      __publicField(this, "hasFlag", false);
      __publicField(this, "nodes", []);
      // 声明的嵌入样式
      __publicField(this, "inlineStyles", {});
      __publicField(this, "classs", {});
      __publicField(this, "icons", {});
      __publicField(this, "treeRef", X());
      __publicField(this, "parentNodes", []);
      __publicField(this, "mutationObserver");
      this.setup();
    }
    getIcon(node) {
      return getIcon(node);
    }
    parseTree() {
      const treeDefine = this.innerHTML;
      const {
        styles,
        classs,
        icons,
        nodes: nodes2 = [],
        hasFlag
      } = parseTree(treeDefine, { format: this.format });
      this.hasFlag = hasFlag;
      this.nodes = nodes2;
      this.inlineStyles = styles;
      this.classs = classs;
      this.icons = icons;
    }
    componentDidMount() {
      injectCustomStyles(this.classs, this.shadowRoot);
      injectSvgIcons(this.icons, this.shadowRoot);
    }
    /**
     * 
     * 当在html/head使用<scrip src="lite-tree.js"><\/script>时，会在DOMContentLoaded之前加载
     * 此时DOM可能还未解析完成，此时读取innerHTML得到的是空
     * 所以需要监听DOM变化，当节点解析完成后再进行解析
     * 
     */
    setup() {
      let el = this;
      while (el.parentNode) {
        el = el.parentNode;
        this.parentNodes.push(el);
      }
      if ([this, ...this.parentNodes].some((el2) => el2.nextSibling) || document.readyState !== "loading") {
        this.onChildrenAvailable();
      } else {
        this.mutationObserver = new MutationObserver(() => {
          if ([this, ...this.parentNodes].some((el2) => el2.nextSibling) || document.readyState !== "loading") {
            this.onChildrenAvailable();
            this.mutationObserver.disconnect();
          }
        });
        this.mutationObserver.observe(this, { childList: true });
      }
    }
    onChildrenAvailable() {
      this.parseTree();
    }
    /**
     * 渲染节点
     * @param node
     */
    renderNodes(nodes2, indent = 0) {
      return /* @__PURE__ */ he.h("ul", { className: "lite-tree-nodes" }, nodes2.map((node) => {
        return this.renderNode(node, indent);
      }));
    }
    /**
     * 获取可见节点（包括子节点）的数量
     * - 如果节点是折叠的，则返回1
     * - 如果节点是展开的，则返回节点本身加上所有子节点的数量
     * 
     * 
     * @param node 
     */
    getVisibleNodeSize(node) {
      let size = 0;
      if (node.open && node.children) {
        node.children.forEach((child) => {
          size++;
          size += this.getVisibleNodeSize(child);
        });
      }
      return size;
    }
    toggleNode(el, node) {
      if (el.children.length > 0) {
        const opener = el.querySelector("span.opener");
        if (opener)
          opener.classList.toggle("open");
        const nodeHeight = el.children[0].offsetHeight;
        node.open = !node.open;
        const childrenEl = el.children[1];
        if (childrenEl) {
          if (node.open) {
            childrenEl.style.height = "0px";
            childrenEl.style.display = "block";
            requestAnimationFrame(() => {
              childrenEl.classList.remove("closed");
              childrenEl.style.height = `${this.getVisibleNodeSize(node) * nodeHeight}px`;
              setTimeout(() => {
                childrenEl.style.height = "auto";
              }, 300);
            });
            this.$emit("expand", {
              detail: node
            });
          } else {
            childrenEl.style.height = String(childrenEl.offsetHeight) + "px";
            requestAnimationFrame(() => {
              childrenEl.style.height = "0px";
              childrenEl.classList.add("closed");
              setTimeout(() => {
                childrenEl.style.display = "none";
              }, 300);
            });
            this.$emit("collapse", {
              detail: node
            });
          }
        }
      }
    }
    renderNode(node, indent = 0) {
      const hasChildren = node.children && node.children.length > 0;
      const ref = X();
      return /* @__PURE__ */ he.h("li", { ref }, /* @__PURE__ */ he.h(
        "span",
        {
          className: "lite-tree-node " + node.classs.join(" "),
          "data-node-id": node.id,
          onClick: () => this.toggleNode(ref.current, node),
          style: toStyleObject(node.style)
        },
        this.hasFlag ? /* @__PURE__ */ he.h("span", { className: "flag" }, this.renderLabel(node.flag)) : null,
        /* @__PURE__ */ he.h("span", { className: "indent", style: { width: indent + "em" } }),
        hasChildren ? /* @__PURE__ */ he.h("span", { className: classnames("opener", "icon", "arrow", { open: node.open }) }) : null,
        /* @__PURE__ */ he.h("span", { className: classnames("icon", this.getIcon(node)) }),
        /* @__PURE__ */ he.h("span", { className: "title" }, this.renderLabel(node.title), node.tags.map((tag, index) => {
          return this.renderLabel(tag, "tag");
        })),
        this.renderLabel(node.comment, "comment")
      ), node.children && node.children.length > 0 ? /* @__PURE__ */ he.h("div", { className: classnames("slidedown", { closed: !node.open }) }, this.renderNodes(node.children, indent + 1.4)) : null);
    }
    renderLabel(content, className = "") {
      const { style: style2, classs = [], value } = StyledString(content, this.inlineStyles);
      return /* @__PURE__ */ he.h(
        "span",
        {
          className: "richlabel " + className + " " + classs.join(" "),
          style: { ...this.inlineStyles, ...toStyleObject(style2) },
          dangerouslySetInnerHTML: { __html: parseLinks(value) }
        }
      );
    }
    render() {
      return /* @__PURE__ */ he.h("div", { ref: this.treeRef, className: "lite-tree", onClick: (e) => handleNodeClick(e, (param) => this.$emit("click", { detail: param })) }, this.renderNodes(this.nodes));
    }
  };
  __decorateClass([
    te({ type: Number })
  ], LiteTree.prototype, "indent", 2);
  __decorateClass([
    te({ type: String })
  ], LiteTree.prototype, "format", 2);
  __decorateClass([
    re()
  ], LiteTree.prototype, "nodes", 2);
  LiteTree = __decorateClass([
    ce({ tag: "lite-tree", style })
  ], LiteTree);
});
