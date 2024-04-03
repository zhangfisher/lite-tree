import {
  h
} from "./chunk-RVDMA4KA.js";

// node_modules/.pnpm/vue-slide-up-down@3.0.0_vue@3.4.21/node_modules/vue-slide-up-down/src/vue-slide-up-down.js
var vue_slide_up_down_default = {
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
export {
  vue_slide_up_down_default as default
};
//# sourceMappingURL=vue-slide-up-down.js.map
