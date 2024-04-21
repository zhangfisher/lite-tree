import { QuarkElement, property, customElement,state,createRef } from "quarkc";
import { parseTree } from "@common/parsers";
import { StyledString, getIcon, injectCustomStyles, injectSvgIcons, parseLinks, toStyleObject,handleNodeClick } from "@common/utils";
import type { LiteTreeNode } from "@common/types";
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

	
	treeRef = createRef<HTMLDivElement>()

	constructor(){
		super()	
		this.setup()			
	}

	private parseTree(){
		const treeDefine = this.innerHTML; 
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
		injectCustomStyles(classs,this.shadowRoot as any);
		injectSvgIcons(icons,this.shadowRoot as any);
	}

	componentDidMount(): void {				
		
	}
	parentNodes = [];
	mutationObserver:any;
	/**
	 * 
	 * 当在html/head使用<scrip src="lite-tree.js"></script>时，会在DOMContentLoaded之前加载
	 * 此时DOM可能还未解析完成，此时读取innerHTML得到的是空
	 * 所以需要监听DOM变化，当节点解析完成后再进行解析
	 * 
	 */
	setup() {
		// collect the parentNodes
		let el:any = this;
		while (el.parentNode) {
		  el = el.parentNode
		  this.parentNodes.push(el)
		}
		// check if the parser has already passed the end tag of the component
		// in which case this element, or one of its parents, should have a nextSibling
		// if not (no whitespace at all between tags and no nextElementSiblings either)
		// resort to DOMContentLoaded or load having triggered
		if ([this, ...this.parentNodes].some(el=> el.nextSibling) || document.readyState !== 'loading') {
		  this.onChildrenAvailable();
		} else {
		  this.mutationObserver = new MutationObserver(() => {
			if ([this, ...this.parentNodes].some(el=> el.nextSibling) || document.readyState !== 'loading') {
			  this.onChildrenAvailable()
			  this.mutationObserver.disconnect()
			}
		  });
	
		  this.mutationObserver.observe(this, {childList: true});
		}
	}
	onChildrenAvailable(){	
		this.parseTree();
	}

	/**
	 * 渲染节点
	 * @param node
	 */
	renderNodes(nodes: LiteTreeNode[],indent:number=0) {
    	return  (
			<ul className="lite-tree-nodes">
        	{ 
				nodes.map((node)=>{
					return this.renderNode(node,indent);
				})
			}
			</ul>
		)
	}

	/**
	 * 获取可见节点（包括子节点）的数量
	 * - 如果节点是折叠的，则返回1
	 * - 如果节点是展开的，则返回节点本身加上所有子节点的数量
	 * 
	 * 
	 * @param node 
	 */
	private getVisibleNodeSize(node:LiteTreeNode):number{
		let size = 0;
		if(node.open && node.children){			
			node.children.forEach((child)=>{
				size++;
				size += this.getVisibleNodeSize(child);
			})
		}
		return size;	
	}
	private toggleNode(el:HTMLLIElement,node:LiteTreeNode){ 
		if(el.children.length>0){ 
			const opener = el.querySelector('span.opener') as HTMLElement
			if(opener) opener.classList.toggle('open')

			const nodeHeight =  (el.children[0] as HTMLElement).offsetHeight 
			node.open = !node.open;	
			const childrenEl = el.children[1] as HTMLElement
			if(childrenEl){
				if(node.open){ // 展开
					childrenEl.style.height = '0px'; // 初始高度设为0  
					childrenEl.style.display = 'block'; // 确保元素是可见的  			
					// 使用requestAnimationFrame来确保在下一帧设置最终高度  
					requestAnimationFrame(() => {  
						childrenEl.classList.remove("closed"); // 移除closed类以应用过渡效果  
						  childrenEl.style.height = `${this.getVisibleNodeSize(node)*nodeHeight}px`; // 设置实际高度以开始过渡  
						setTimeout(()=>{childrenEl.style.height ='auto'},300)
					});  					
					this.$emit('expand',{
						detail:node
					})
				}else{ // 折叠
					childrenEl.style.height = String(childrenEl.offsetHeight)+'px'				
					requestAnimationFrame(()=>{
						childrenEl.style.height = '0px'						
						childrenEl.classList.add("closed")				
						setTimeout(()=>{childrenEl.style.display='none'},300)
					})						
					this.$emit('collapse',{
						detail:node
					})
				}
			}
		}
	}
	renderNode(node:LiteTreeNode,indent:number=0) {
		const hasChildren = node.children && node.children.length > 0
		const ref = createRef<HTMLLIElement>()
    	return (<li ref={ref}>
			<span className={"lite-tree-node "+node.classs.join(" ")} 			
				data-node-id={node.id}	
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
      		<div ref ={this.treeRef} className="lite-tree" onClick={(e:any)=>handleNodeClick(e,(param)=>this.$emit('click',{detail:param}))}>
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
