import React, {Component} from 'react';
import { Space,Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import request from "../../network/request";

class Login extends Component {


    constructor(props) {
        super(props);
        const screenWidth=window.innerWidth;
        this.state={
            translateX: screenWidth/2-160,
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
        this.props.showLogin(false);
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
        const cursorStyle = {
            cursor:this.state.cursorStyle ? 'pointer' : 'default'
        };

        const onFinish = values => {
            console.log('Received values of form: ', values);
            request.login(values).then(response=>{
                console.log(response)
                return response.json();
            }).then(
                data=>{
                    if(data==0){
                        this.onHandleClick();
                    }
                    console.log(data);
                }
            )
        };
        return (
            <div style={{width:'1px',height:'0px'} } className="position-fixed">
                <div
                    style={{transform: `translateX(${this.state.translateX}px)translateY(${this.state.translateY}px)`}}
                >
                    <div className="shadow p-3 mb-5 bg-white rounded" style={{ width: '32000%', height: 300, backgroundColor: 'white',left:'50%'}}>
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
                        <div style={{float:'left'}} className="ml-5">
                            <Space direction="vertical" size="middle">
                                <Form
                                    name="normal_login"
                                    className="login-form"
                                    initialValues={{ remember: true }}
                                    onFinish={onFinish}
                                >
                                    <Form.Item
                                        name="username"
                                        rules={[{ required: true, message: '请输入你的用户名!' }]}
                                    >
                                        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="用户名" />
                                    </Form.Item>
                                    <Form.Item
                                        name="password"
                                        rules={[{ required: true, message: '请输入你的密码!' }]}
                                    >
                                        <Input
                                            prefix={<LockOutlined className="site-form-item-icon" />}
                                            type="password"
                                            placeholder="密码"
                                        />
                                    </Form.Item>


                                    <Form.Item>
                                        <Button type="primary" htmlType="submit" className="login-form-button" style={{width:"100%"}}>
                                            登录
                                        </Button>
                                    </Form.Item>

                                    <Form.Item className="float-right pt-0">
                                        {/*<Form.Item name="remember" valuePropName="checked" noStyle>
                                            <Checkbox>Remember me</Checkbox>
                                        </Form.Item>*/}
                                        <Button type="link" htmlType="button" onClick={e => this.onChangePassword(e)}>
                                            修改密码
                                        </Button>
                                        {/*<a href="#!" onClick={e => this.onChangePassword} className="login-form-forgot" >
                                            修改密码
                                        </a>*/}
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

export default Login;
