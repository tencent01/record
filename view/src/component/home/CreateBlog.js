import React, {Component} from 'react';
import BlgDescription from "./blog/BlgDescription";
import BlogSolve from "./blog/BlogSolve";
import { Form, Input, Button, Checkbox } from 'antd';

class CreateBlog extends Component {

    constructor(props) {
        super(props);
        this.state={
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


    render() {
        const cursorStyle = {
            cursor:this.state.cursorStyle ? 'pointer' : 'default'
        };

        const formItemLayout = {
            labelCol: { span: 4 },
            wrapperCol: { span: 8 },
        };
        const formTailLayout = {
            labelCol: { span: 4 },
            wrapperCol: { span: 8, offset: 4 },
        };


        const onCheck = async () => {
            try {
            } catch (errorInfo) {
                console.log('Failed:', errorInfo);
            }
        };
        return (
            <div style={{width:'1px',height:'0px'}} className="float-left">
                <div className="float-left"
                     style={{transform: `translateX(${this.state.translateX}px)translateY(${this.state.translateY}px)`}}
                >
                    <div className="shadow p-3 mb-5 bg-white rounded" style={{ width:1000, height: window.innerHeight-50, backgroundColor: 'white',left:'50%'}}>
                        <div
                            onMouseDown={e => this.onMouseDown(e)}
                            onTouchStart={e => this.onMouseDown(e)}
                            onMouseOut={e=>this.onMouseOut(e)}
                            onMouseOver={e=>this.onMouseOver(e)}
                            onMouseUp={e=>this.onMouseUp(e)}
                            onMouseMove={e=>this.onMouseMove(e)}
                            className="pb-1"
                            style={{cursor:cursorStyle.cursor, width: '100%', height: 20, backgroundColor: 'white' }}
                        >
                            <button onClick={this.onHandleClick} type="button" className="close" aria-label="关闭">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div style={{width:"100%",height:window.innerHeight-100,overflow:'auto'}} >
                            <div style={{height: 10,}} >
                                <Form  name="dynamic_rule">
                                    <Form.Item
                                        {...formItemLayout}
                                        name="username"
                                        label="问题项"
                                        rules={[
                                            {
                                                required: true,
                                                message: '请输入你的问题名称',
                                            },
                                        ]}
                                    >
                                        <Input placeholder="请输入你的问题名称" />
                                    </Form.Item>

                                    <BlgDescription></BlgDescription>
                                    <BlogSolve></BlogSolve>
                                    <Form.Item {...formTailLayout}>
                                        <Button type="primary" onClick={onCheck}>
                                            Check
                                        </Button>
                                    </Form.Item>
                                </Form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default CreateBlog;
