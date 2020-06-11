import React, { Component,useState } from 'react';
import {
    Form,
    Input,
    Tooltip,
    Cascader,
    Select,
    Row,
    Col,
    Checkbox,
    Button,
    AutoComplete, Space,
} from 'antd';
import request from "../../network/request";

class UpdatePassword extends Component {


    constructor(props) {
        super(props);
        const screenWidth=window.innerWidth;
        this.state={
            translateX: screenWidth/2-300,
            translateY: 150,
        };
        this.moving = false;
        this.lastX = null;
        this.lastY = null;
        window.onmouseup = e => this.onMouseUp(e);
        window.onmousemove = e => this.onMouseMove(e);
        window.ontouchend = e => this.onMouseUp(e);
        window.ontouchmove = e => this.onTouchMove(e);
        this.onHandleClick=this.onHandleClick.bind(this);
        this.onHandleShowCreateAccount=this.onHandleShowCreateAccount.bind(this);
        this.onSubmittClick=this.onSubmittClick.bind(this);
        this.onChangePassword=this.onChangePassword.bind(this);;
        this.onHandleShowUpdatePassword=this.onHandleShowUpdatePassword.bind(this);
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
        this.props.showUpdatePassword(false,false);
    }

    onHandleShowCreateAccount(){
        this.props.showCreateAccount(true,true);
    }

    onHandleShowUpdatePassword(){
        console.log("aaaaaaaaaa")
        this.props.showUpdatePassword(true,false);
    }

    onSubmittClick(){

    }

    onChangePassword(e){
        this.onHandleShowUpdatePassword();
    }


    render() {

        const { Option } = Select;
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 8 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 },
            },
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 16,
                    offset: 8,
                },
            },
        };

        const onFinish = values => {
            console.log('Received values of form: ', values);
            request.updatePassword(values).then(response=>{
                return response.json();
            }).then(
                data=>{
                    console.log(data)
                }
            );
        };
        const cursorStyle = {
            cursor:this.state.cursorStyle ? 'pointer' : 'default'
        };

        return (
            <div style={{width:'1px',height:'0px'} } className="position-fixed">
                <div
                    style={{transform: `translateX(${this.state.translateX}px)translateY(${this.state.translateY}px)`}}
                >
                    <div className="shadow p-3 mb-5 bg-white rounded" style={{ width: '60000%', height: 400, backgroundColor: 'white',left:'50%'}}>
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
                        <div style={{float:'left',width:'85%'}} className="">
                            <Space direction="vertical" size="middle" style={{width:'100%'}}>
                                <Form
                                    {...formItemLayout}
                                    /*form={form}*/
                                    name="register"
                                    onFinish={onFinish}
                                    initialValues={{
                                        residence: ['zhejiang', 'hangzhou', 'xihu'],
                                        prefix: '86',
                                    }}
                                    scrollToFirstError
                                    style={{width:'100%'}}
                                >
                                    <Form.Item
                                        name="username"
                                        label="用户名"
                                        rules={[
                                            {
                                                required: true,
                                                message: '请输入你的用户名!',
                                            },
                                        ]}
                                    >
                                        <Input />
                                    </Form.Item>

                                    <Form.Item
                                        name="oldpassword"
                                        label="密码"
                                        rules={[
                                            {
                                                required: true,
                                                message: '请输入你的密码!',
                                            },
                                        ]}
                                        hasFeedback
                                    >
                                        <Input.Password />
                                    </Form.Item>
                                    <Form.Item
                                        name="password"
                                        label="新密码"
                                        rules={[
                                            {
                                                required: true,
                                                message: '请输入你的新密码!',
                                            },
                                        ]}
                                        hasFeedback
                                    >
                                        <Input.Password />
                                    </Form.Item>

                                    <Form.Item
                                        name="confirm"
                                        label="确认密码"
                                        dependencies={['password']}
                                        hasFeedback
                                        rules={[
                                            {
                                                required: true,
                                                message: '请确认你的新密码!',
                                            },
                                            ({ getFieldValue }) => ({
                                                validator(rule, value) {
                                                    if (!value || getFieldValue('password') === value) {
                                                        return Promise.resolve();
                                                    }
                                                    return Promise.reject('两次输入的密码不一致!');
                                                },
                                            }),
                                        ]}
                                    >
                                        <Input.Password />
                                    </Form.Item>

                                    <Form.Item {...tailFormItemLayout}>
                                        <Button type="primary" htmlType="submit" style={{width:'100%'}}>
                                            修改
                                        </Button>
                                    </Form.Item>
                                </Form>
                            </Space>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default UpdatePassword;
