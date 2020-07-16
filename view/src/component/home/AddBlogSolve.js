import React, {Component} from 'react';
import BlogSolve from "./blog/BlogSolve";
import {Button, Form, Input, Space} from "antd";
import BlogSolveCk from "./blog/BlogSolveCK";
import AddSolve from "./blog/AddSolve";
import request from "../../network/request";



class AddBlogSolve extends Component {

    constructor(props) {
        super(props);
        this.state={
            translateX: 0,
            translateY: 0,
            html:null,
        };
        this.moving = false;
        this.lastX = null;
        this.lastY = null;
        window.onmouseup = e => this.onMouseUp(e);
        window.onmousemove = e => this.onMouseMove(e);
        window.ontouchend = e => this.onMouseUp(e);
        window.ontouchmove = e => this.onTouchMove(e);
        this.onHandleClick=this.onHandleClick.bind(this);
        this.onBlogSolve=this.onBlogSolve.bind(this);
        this.scrollToBottom=this.scrollToBottom.bind(this);
    }


    onMouseDown(e) {
        e.stopPropagation();
        this.moving = true;
    }

    onMouseUp() {
        this.moving = false;
        this.lastX = null;
        this.lastY = null;
    }

    onMouseMove(e) {
        this.moving && this.onMove(e);
    }

    onTouchMove(e) {
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
        if(this.lastX && this.lastY) {
            let dx = e.clientX - this.lastX;
            let dy = e.clientY - this.lastY;
            this.setState({ translateX: this.state.translateX + dx, translateY: this.state.translateY + dy })
        }
        this.lastX = e.clientX;
        this.lastY = e.clientY;
    }

    onMouseOut(e){
        this.setState({
            cursorStyle:false
        });
    }

    onMouseOver(e){
        this.setState({
            cursorStyle:true
        });
    }

    onHandleClick(){
        this.props.onShowAddSolveView(false);
    }

    onBlogSolve(html){
        this.setState({
            html:html
        })
    }

    scrollToBottom() {
        if (this.messagesEnd) {
            request.readFile({keys:this.props.nodeKey},this.props.token).then(response=>{
                console.log(response)
                if(response.status==200){
                    return response.text();
                }else{
                    return "不支持此格式"
                }
                // return response.text();
            }).then(data=>{
                if(data){
                    this.messagesEnd.innerHTML=data;

                    const scrollHeight = this.messagesEnd.scrollHeight;//里面div的实际高度  2000px
                    const height = this.messagesEnd.clientHeight;  //网页可见高度  200px
                    const maxScrollTop = scrollHeight - height;
                    this.messagesEnd.scrollTop = maxScrollTop > 0 ? maxScrollTop : 0;
                }

                return data;
            })
            //如果实际高度大于可见高度，说明是有滚动条的，则直接把网页被卷去的高度设置为两个div的高度差，实际效果就是滚动到底部了。
        }
    }

    render() {
        const cursorStyle = {
            cursor:this.state.cursorStyle ? 'pointer' : 'default'
        };
        const onCheck = async () => {
            try {
                console.log(this.state.html)
                console.log(this.props.nodeKey)
                if(this.state.html){
                    request.addSolve({solve:this.state.html,key:this.props.nodeKey},this.props.token).then(response=>{
                        console.log(response)
                        return response.text();
                    }).then(
                        data=>{
                            this.messagesEnd.innerHTML=data;
                            const scrollHeight = this.messagesEnd.scrollHeight;//里面div的实际高度  2000px
                            const height = this.messagesEnd.clientHeight;  //网页可见高度  200px
                            const maxScrollTop = scrollHeight - height;
                            this.messagesEnd.scrollTop = maxScrollTop > 0 ? maxScrollTop : 0;
                            console.log(data)
                        }
                    )
                }else{
                    console.log("提交失败")
                }

            } catch (errorInfo) {
                console.log('Failed:', errorInfo);
            }
        };
        let m=this.props.message?(this.scrollToBottom()):"";
        return (
            <div style={{width:'1px',height:'0px'} } className="float-left">
                <div
                    style={{transform: `translateX(${this.state.translateX}px)translateY(${this.state.translateY}px)`}}
                >
                    <div className="shadow p-3 mb-5 bg-white rounded" style={{ width: 1035, height: window.innerHeight-50, backgroundColor: 'white',left:'50%'}}>
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
                            <button onClick={this.onHandleClick} type="button" className="close" aria-label="关闭">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div ref="showdiv" ref={(el) => { this.messagesEnd = el; }} style={{float:'left',height:window.innerHeight/2-60,overflow:'auto'}} className="" dangerouslySetInnerHTML={{__html:this.props.onShowRecordData}}>

                        </div>
                        <div style={{float:'left',height:window.innerHeight/2-60,overflow:'auto',width:'100%'}} className="">
                            <AddSolve onBlogSolve={this.onBlogSolve}></AddSolve>
                            <Button type="primary" htmlType="submit" className="float-right mr-1" onClick={onCheck} >
                                提交
                            </Button>
                        </div>

                    </div>
                </div>
            </div>
        );
    }
}

export default AddBlogSolve;
