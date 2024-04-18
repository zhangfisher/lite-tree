import { QuarkElement, property, customElement,state,createRef } from "quarkc";
import { parseTree } from "@common/parsers";
import { StyledString, getIcon, injectCustomStyles, injectSvgIcons, parseLinks, toStyleObject } from "@common/utils";
import type { LiteTreeProps, LiteTreeNode } from "@common/types";
import classnames from 'classnames'; 
import style from  "./index.css?raw"   
@customElement({ tag: "lite-tree",style})
class LiteTree extends QuarkElement {
	@property({ type: Number })
	indent = 4;
	@property({ type: String })
	format = "lite";
	
	getIcon(node){
		return getIcon(node)
	}

	//是否显示标识
	hasFlag: boolean = false;
	// 树节点数据
	@state()
	nodes: LiteTreeNode[] = [];
	// 声明的嵌入样式
	inlineStyles: Record<string, string> = {};


	constructor(){
		super()
		const treeDefine = this.innerHTML.trim();
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


	componentDidMount() {
		// 生命周期
		
	}
	/**
	 * 渲染节点
	 * @param node
	 */
	renderNodes(nodes: LiteTreeNode[],indent:number=0) {
    	return  (
			<ul className="lite-tree-nodes">
        	{ 
				nodes.map((node,index)=>{
					return this.renderNode(node,indent);
				})
			}
			</ul>
		)
	}
	toggleNode(el:HTMLLIElement,node:LiteTreeNode){ 
		if(el.children.length>0){
			node.open = !node.open;	
			const childrenEl = el.children[1] as HTMLElement
			if(node.open){ // 展开
				childrenEl.style.height = '0px'; // 初始高度设为0  
				childrenEl.style.display = 'block'; // 确保元素是可见的  			
				// 使用requestAnimationFrame来确保在下一帧设置最终高度  
				requestAnimationFrame(() => {  
					childrenEl.classList.remove("closed"); // 移除closed类以应用过渡效果  
				  	childrenEl.style.height = `${200}px`; // 设置实际高度以开始过渡  
					setTimeout(()=>{childrenEl.style.height ='auto'},300)
				});  
			}else{ // 折叠
				childrenEl.style.height = String(childrenEl.offsetHeight)+'px'				
				requestAnimationFrame(()=>{
					childrenEl.style.height = '0px'						
					childrenEl.classList.add("closed")				
					setTimeout(()=>{
						childrenEl.style.height ='auto'
						childrenEl.style.display='none'
					},300)
				})	
			}
		}
	}
	renderNode(node:LiteTreeNode,indent:number=0) {
		const hasChildren = node.children && node.children.length > 0
		const ref = createRef<HTMLLIElement>()
    	return (<li data-lite-tree ref={ref}>
			<span className={"lite-tree-node "+node.classs.join(" ")} 				
				onClick={()=>this.toggleNode(ref.current,node)}
				style={toStyleObject(node.style)}>
				{/* 显示标识 */}
				{ this.hasFlag ? <span className ="flag">                        
					{this.renderLabel(node.flag)}
				</span> : null } 
				{/* 缩进距离 */}
				<span className="indent" style={ {width: indent + 'em'} }></span>
				{/* 展开折叠指示符 */}
				{ hasChildren ? <span className={classnames('opener','icon','arrow',{ open: node.open})} /> : null}
				{/* 图标 */}
				<span className={classnames("icon",this.getIcon(node))} />
				{/* 标题 */}
				<span className="title">					
					{this.renderLabel(node.title)}
					{/* 标签 */}
					{ node.tags.map((tag,index)=>{return this.renderLabel(tag,'tag')}) }
				</span>
				{/* 注释 */}
				{this.renderLabel(node.comment,'comment')}
			</span>
			{/* 子节点 */}
			{ node.children && node.children.length>0 ?         
				<div className={classnames("slidedown", {closed:!node.open})}>
				 	{this.renderNodes(node.children, indent+1.4)}
				 </div>               
				 : null
			}   
		</li>)
  	}
	renderLabel(content: string,className:string='') {
		const {style,classs=[],value} = StyledString(content,this.inlineStyles);
		return <span 
			className={'richlabel '+className + " " +classs.join(" ")}
			style={{...this.inlineStyles,...toStyleObject(style)!}}
        	dangerouslySetInnerHTML={{__html: parseLinks(value)}}
		/>
	}
	render() {
		return ( 
      		<div className={classnames("lite-tree")}>
          		{this.renderNodes(this.nodes)}
      		</div> 
		);
	}
}

declare global {
	interface HTMLElementTagNameMap {
		"lite-tree": LiteTree;
	}
}
