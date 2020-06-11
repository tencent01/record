import React, {Component} from 'react';
import {Rnd } from 'react-rnd';

import { Tree } from 'antd';
import request from "../../network/request";
import './style.css';

const { DirectoryTree } = Tree;

class MenuAndTree extends Component {

    constructor(props) {
        super(props);
        this.state={
            treeData:[
                {
                    title: 'parent 0',
                    key: '0-0',
                    children: [
                        {
                            title: 'leaf 0-0',
                            key: '0-0-0',
                            isLeaf: true,
                        },
                        {
                            title: 'leaf 0-1',
                            key: '0-0-1',
                            isLeaf: true,
                        },
                        {
                            title: 'parent 2',
                            key: '0-0-2',
                            children: [
                                {
                                    title: 'leaf 0-0',
                                    key: '0-0-2-0',
                                    isLeaf: true,
                                },
                                {
                                    title: 'leaf 0-1',
                                    key: '0-0-2-1',
                                    isLeaf: true,
                                },
                                {
                                    title: 'parent 2',
                                    key: '0-0-2-3',
                                    children: [
                                        {
                                            title: 'leaf 0-0',
                                            key: '0-0-2-3-0',
                                            isLeaf: true,
                                        },
                                        {
                                            title: 'leaf 0-1',
                                            key: '0-0-2-3-1',
                                            isLeaf: true,
                                        },
                                        {
                                            title: 'parent 2',
                                            key: '0-0-2-3-2',
                                            children: [
                                                {
                                                    title: 'leaf 0-0',
                                                    key: '0-0-2-3-2-0',
                                                    isLeaf: true,
                                                },
                                                {
                                                    title: 'leaf 0-1',
                                                    key: '0-0-2-3-2-1',
                                                    isLeaf: true,
                                                },
                                            ],
                                        }
                                    ],
                                }

                            ],
                        }

                    ],
                },
                {
                    title: 'parent 1',
                    key: '0-1',
                    children: [
                        {
                            title: 'leaf 1-0',
                            key: '0-1-0',
                            isLeaf: true,
                        },
                        {
                            title: 'leaf 1-1',
                            key: '0-1-1',
                            isLeaf: true,
                        },
                    ],
                },
            ],
            translateX: 0,
            translateY: 0,
        };
        this.moving = false;
        this.lastX = null;
        this.lastY = null;
        window.onmouseup = e => this.onMouseUp(e);
        window.onmousemove = e => this.onMouseMove(e);
        window.ontouchend = e => this.onMouseUp(e);
        window.ontouchmove = e => this.onTouchMove(e);
        this.dataToTree=this.dataToTree.bind(this);
    }



    componentDidMount() {
        request.getAllBlog().then(response=>{
            return response.json();
        }).then(data=>{
            console.log(data);
            console.log(this.dataToTree(data));
            this.setState({
                treeData:this.dataToTree(data),
            })
        });
    }

    dataToTree(data){
        let newTreeData=[];
        if(data!=null){
            for (let i = 0; i <data.length ; i++) {
                let dataItem=data[i];
                let dataJson=new Object();
                dataJson.title=dataItem.name;
                dataJson.key=dataItem.key;
                dataJson.state=dataItem.state;
                if(dataItem.blogNodes==null){
                    dataJson.isLeaf=true;
                }else{
                    dataJson.children=this.dataToTree(dataItem.blogNodes);
                }
                newTreeData.push(dataJson)
            }
        }
        return newTreeData;

    }


    onMouseDown(e) {
        console.log("and onMouseDown")
        e.stopPropagation();
        this.moving = true;
    }

    onMouseUp() {
        console.log("and onMouseUp")
        this.moving = false;
        this.lastX = null;
        this.lastY = null;
    }

    onMouseMove(e) {
        console.log("and onMouseMove")
        this.moving && this.onMove(e);
    }

    onTouchMove(e) {
        console.log("and onTouchMove")
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
        console.log("and onMove")
        if(this.lastX && this.lastY) {
            let dx = e.clientX - this.lastX;
            let dy = e.clientY - this.lastY;
            this.setState({ translateX: this.state.translateX + dx, translateY: this.state.translateY + dy })
        }
        this.lastX = e.clientX;
        this.lastY = e.clientY;
    }
    onMouseOut(e){
        console.log("and onMouseOut")
        this.setState({
            cursorStyle:false
        });
    }

    onMouseOver(e){
        console.log("and onMouseOver")
        this.setState({
            cursorStyle:true
        });
    }

    render() {
        const onSelect = (keys, event) => {
            console.log('Trigger Select', keys, event);
            request.readFile({keys:keys}).then(response=>{
                return response.json();
            }).then(data=>{
                console.log(data);
                return data;
            })
        };

        const onExpand = () => {
            console.log('Trigger Expand');
        };
        const onRightClick = (o) => {
            let node=o.node;

            console.log(node);

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
                        <div style={{width:"100%",height:window.innerHeight-135,overflow:'auto'}} className="float-left">
                            <div style={{width:"auto", display:"inline-block"}}>
                                <DirectoryTree
                                    multiple
                                    defaultExpandAll
                                    onSelect={onSelect}
                                    onExpand={onExpand}
                                    onRightClick={onRightClick}
                                    treeData={this.state.treeData}
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
