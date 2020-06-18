import React, {Component} from 'react';
import {Rnd } from 'react-rnd';

import { Tree } from 'antd';
import request from "../../network/request";
import './style.css';


let isRightTree=false;

const { DirectoryTree } = Tree;

class MenuAndTree extends Component {

    constructor(props) {
        super(props);
        this.state={
            translateX: 0,
            translateY: 0,
            node:null,
        };
        this.moving = false;
        this.lastX = null;
        this.lastY = null;
        window.onmouseup = e => this.onMouseUp(e);
        window.onmousemove = e => this.onMouseMove(e);
        window.ontouchend = e => this.onMouseUp(e);
        window.ontouchmove = e => this.onTouchMove(e);
        window.oncontextmenu=e=>this.onWinClick(e);
        this.onHandleClickDir=this.onHandleClickDir.bind(this);
    }



    componentDidMount() {
    }

    onWinClick(e){
        // console.log("AAAAAAAAAAAAAAAAA")
        // e.preventDefault();
    }


    onMouseDown(e) {
        // console.log("and onMouseDown")
        e.stopPropagation();
        this.moving = true;
    }

    onMouseUp() {
        // console.log("and onMouseUp")
        this.moving = false;
        this.lastX = null;
        this.lastY = null;
    }

    onMouseMove(e) {
        // console.log("and onMouseMove")
        this.moving && this.onMove(e);
    }

    onTouchMove(e) {
        // console.log("and onTouchMove")
        this.moving && this.onTouchesMove(e);
    }

    onTouchesMove(e) {
        let touch=e.touches[0];
        if(this.lastX && this.lastY) {
            let dx = touch.pageX - this.lastX;
            let dy = touch.pageY - this.lastY;
            this.setState({ translateX: this.state.translateX + dx, translateY: this.state.translateY + dy })
        }
        this.lastX = touch.pageX;
        this.lastY = touch.pageY;
    }

    onMove(e) {
        // console.log("and onMove")
        if(this.lastX && this.lastY) {
            let dx = e.clientX - this.lastX;
            let dy = e.clientY - this.lastY;
            this.setState({ translateX: this.state.translateX + dx, translateY: this.state.translateY + dy })
        }
        this.lastX = e.clientX;
        this.lastY = e.clientY;
    }
    onMouseOut(e){
        // console.log("and onMouseOut")
        this.setState({
            cursorStyle:false
        });
    }

    onMouseOver(e){
        // console.log("and onMouseOver")
        this.setState({
            cursorStyle:true
        });
    }

    onHandleClickDir(e){
        e.preventDefault();
        if(isRightTree) {
            isRightTree = false;
            console.log("is node",this.state.node)
            this.props.onShowMeneClick(true,e.clientX,e.clientY);
        }else {
            console.log("not node")

            this.props.onNodeData(null);
            this.props.onShowMeneClick(true,e.clientX,e.clientY);
        }
        // if(this.state.isRightTree){
        //     this.setState({
        //         isRightTree:false,
        //     })
        // }else{
        //     this.setState({
        //         node:null,
        //     })
        // }

        // console.log(this.state.isRightTree)
        // this.props.onShowMeneClick(this.state.node,true,e.clientX,e.clientY);

    }

    render() {
        const onSelect = (keys, event) => {
            console.log('Trigger Select', keys, event);
            // console.log(event.node.isLeaf)
            if(event.node.isLeaf){
                request.readFile({keys:keys}).then(response=>{
                    return response.text();
                }).then(data=>{
                    this.props.onRecordViewData(true,data)
                    return data;
                })
            }else{
                console.log("dir")
            }

        };

        const onExpand = () => {
            console.log('Trigger Expand');
        };
        const onRightClick = (o) => {
            let node=o.node;
            isRightTree=true;
            // this.props.onShowMeneClick(node,true,o.event.clientX,o.event.clientY);
            this.props.onNodeData(node);
        };

        const cursorStyle = {
            cursor:this.state.cursorStyle ? 'pointer' : 'default'
        };

        return (
            /*<Rnd className="shadow-lg p-3 mb-5 bg-white rounded"
                 bounds="window"className="float-left"
            >*/

            <div style={{width:'1px',height:'0px'}} >
                <div className="float-left"
                     style={{transform: `translateX(${this.state.translateX}px)translateY(${this.state.translateY}px)`}}
                >
                    <div className="shadow p-3 mb-5 bg-white rounded div_none" style={{ width:300, height: window.innerHeight-50, backgroundColor: 'white',left:'50%'}}>
                        <div
                            onMouseDown={e => this.onMouseDown(e)}
                            onTouchStart={e => this.onMouseDown(e)}
                            onMouseOut={e=>this.onMouseOut(e)}
                            onMouseOver={e=>this.onMouseOver(e)}
                            onMouseUp={e=>this.onMouseUp(e)}
                            onMouseMove={e=>this.onMouseMove(e)}
                            className="pb-5"
                            style={{cursor:cursorStyle.cursor, width: '100%', height: 20, backgroundColor: 'white' }}
                        >
                            记录项
                            <button onClick={this.onHandleClick} type="button" className="close" aria-label="关闭">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div style={{width:"100%",height:window.innerHeight-135,overflow:'auto'}} onContextMenu={this.onHandleClickDir} className="float-left">
                            <div style={{width:"auto", display:"inline-block"}}>
                                <DirectoryTree
                                    multiple
                                    defaultExpandAll
                                    onSelect={onSelect}
                                    onExpand={onExpand}
                                    onRightClick={onRightClick}
                                    ref="tree"
                                    treeData={this.props.treeData}
                                />
                            </div>

                        </div>
                    </div>
                </div>
            </div>


                /*</Rnd>*/
        );
    }
}

export default MenuAndTree;
