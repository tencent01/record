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

    render() {
        const cursorStyle = {
            cursor:this.state.cursorStyle ? 'pointer' : 'default'
        };
        const onCheck = async () => {
            try {
                console.log(this.state.html)
                request.addSolve({solve:this.state.html,key:this.props.nodeKey},this.props.token).then(response=>{
                    console.log(response)
                    return response.text();
                }).then(
                    data=>{
                        this.refs.showdiv.innerHTML=data;
                        console.log(data)
                    }
                )
            } catch (errorInfo) {
                console.log('Failed:', errorInfo);
            }
        };
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
                        <div ref="showdiv" style={{float:'left',height:window.innerHeight/2-60,overflow:'auto'}} className="" dangerouslySetInnerHTML={{__html:this.props.onShowRecordData}}>

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
