import React, {Component} from 'react';
import {Button, Form, Input, Breadcrumb } from 'antd';
import request from "../../network/request";

class CreateRecord extends Component {


    constructor(props) {
        super(props);
        this.state={
            translateX: 0,
            translateY: 0,
            newRecordPathValue:this.props.newRecordPathValue,
        };
        this.moving = false;
        this.lastX = null;
        this.lastY = null;
        window.onmouseup = e => this.onMouseUp(e);
        window.onmousemove = e => this.onMouseMove(e);
        window.ontouchend = e => this.onMouseUp(e);
        window.ontouchmove = e => this.onTouchMove(e);
        this.onHandleClick=this.onHandleClick.bind(this);
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
        this.props.onClickNewRecord(false);
    }

    render() {
        const { Search } = Input;
        const cursorStyle = {
            cursor:this.state.cursorStyle ? 'pointer' : 'default'
        };
        return (
            <div style={{width:'1px',height:'0px'} } className="float-left">
                <div
                    style={{transform: `translateX(${this.state.translateX}px)translateY(${this.state.translateY}px)`}}
                >
                    <div className="shadow p-3 mb-5 bg-white rounded" style={{ width: 500, height: 120, backgroundColor: 'white',left:'50%'}}>
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
                        <div style={{float:'left',width: '100%'}} className="ml-1">
                            <div>
                                <Search placeholder="记录项"
                                       enterButton="创建"
                                       onSearch={value => {
                                           let path=new Object();
                                           path.path=value;
                                           request.addRecord(path,this.props.token).then(response=>{
                                               return response.json();
                                           }).then(data=>{
                                               this.props.onAllFileData(data);
                                           });
                                           console.log(value)
                                       }}
                                        value={this.state.newRecordPathValue}
                                        onChange={(e)=>{
                                            this.setState({
                                                newRecordPathValue:e.target.value,
                                            })
                                        }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default CreateRecord;
