import { QuarkElement, property, customElement } from "quarkc";
import { parseTree } from "@common/parsers";
import { getIcon, injectCustomStyles, injectSvgIcons } from "@common/utils";
import type { LiteTreeProps, LiteTreeNode } from "@common/types";
import classnames from 'classnames'; 
import style from  "@common/styles?inline"


export
@customElement({ tag: "lite-tree", style })
class LiteTree extends QuarkElement {
	@property({ type: Number })
	indent = 4;
	@property({ type: String })
	format = "lite";
	//是否显示标识
	hasFlag: boolean = false;
	// 树节点数据
	nodes: LiteTreeNode[] = [];
	// 声明的嵌入样式
	inlineStyles: Record<string, string> = {};

	componentDidMount() {
		// 生命周期
		const treeDefine = this.getInnerHTML();
		const {
			styles,
			classs,
			icons,
			nodes = [],
			hasFlag,
		} = parseTree(treeDefine, { format: this.format as any});
		this.hasFlag = hasFlag;
		this.nodes = nodes;
		this.inlineStyles = styles;
		injectCustomStyles(classs);
		injectSvgIcons(icons);
	}
	/**
	 * 渲染节点
	 * @param node
	 */
	renderNode(node) {
    return <div>{node.title}</div>
  }
	renderLabel(content: string) {
		return content;
	}
	render() {
		return ( 
      <div data-lite-tree className={classnames("lite-tree")}>
          {this.nodes.map((node) => {
              return this.renderNode(node);
          })}                
      </div> 
		);
	}
}

declare global {
	interface HTMLElementTagNameMap {
		"lite-tree": LiteTree;
	}
}
