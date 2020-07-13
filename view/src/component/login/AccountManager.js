import React, {Component} from 'react';
import {Button, Form, Input, Select, Space} from "antd";
import { Tabs, Radio } from 'antd';
import { Table, Tag,message } from 'antd';
import request from "../../network/request";

const { Option } = Select;

const { TabPane } = Tabs;

class AccountManager extends Component {

    constructor(props) {
        super(props);
        this.state={
            translateX: 0,
            translateY: 0,
            size: 'small'
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
        this.props.showAccountManager(false);
    }

    onChange = e => {
        this.setState({ size: e.target.value });
    };

    render() {

        const cursorStyle = {
            cursor:this.state.cursorStyle ? 'pointer' : 'default'
        };
        const { size } = this.state;

        const columns = [
            {
                title: 'Name',
                dataIndex: 'name',
                key: 'name',
                render: text => <a>{text}</a>,
            },
            {
                title: 'Age',
                dataIndex: 'age',
                key: 'age',
            },
            {
                title: 'Address',
                dataIndex: 'address',
                key: 'address',
            },
            {
                title: 'Tags',
                key: 'tags',
                dataIndex: 'tags',
                render: tags => (
                    <>
                        {tags.map(tag => {
                            let color = tag.length > 5 ? 'geekblue' : 'green';
                            if (tag === 'loser') {
                                color = 'volcano';
                            }
                            return (
                                <Tag color={color} key={tag} closable onClose={preventDefault}>
                                    {tag.toUpperCase()}
                                </Tag>
                            );
                        })}
                    </>
                ),
            },
            {
                title: 'Action',
                key: 'action',
                render: (text, record) => (
                    <Space size="middle">
                        <a>Invite {record.name}</a>
                        <a>Delete</a>
                    </Space>
                ),
            },
        ];

        const data = [
            {
                key: '1',
                name: 'John Brown',
                age: 32,
                address: 'New York No. 1 Lake Park',
                tags: ['nice', 'developer'],
            },
            {
                key: '2',
                name: 'Jim Green',
                age: 42,
                address: 'London No. 1 Lake Park',
                tags: ['loser'],
            },
            {
                key: '3',
                name: 'Joe Black',
                age: 32,
                address: 'Sidney No. 1 Lake Park',
                tags: ['cool', 'teacher'],
            },
        ];

        function preventDefault(e) {
            e.preventDefault();
            console.log('Clicked! But prevent default.');
        }


        const { Option } = Select;
        /*const formItemLayout = {
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
        };*/

        const onFinish = values => {
            console.log('Received values of form: ', values);
            request.addUser(values,this.props.token).then(response=>{
                return response.json();
            }).then(
                data=>{
                    if(data.success==true){
                        message.info('添加成功');
                    }else{
                        message.info('添加失败');
                    }
                    console.log(data)
                }
            );
        };

        const onGenderChange = value => {
            switch (value) {
                case "male":
                    return;
                case "female":
                    return;
                case "other":
                    return;
            }
        };

        return (
            <div style={{width:'1px',height:'0px'} } className="float-left">
                <div
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
                            className="pb-5"
                            style={{cursor:cursorStyle.cursor, width: '100%', height: 20, backgroundColor: 'white' }}
                        >
                            账号管理
                            <button onClick={this.onHandleClick} type="button" className="close" aria-label="关闭">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div style={{float:'left',width: '90%'}} className="ml-5">
                            <div style={{ width: '100%' }}>
                                <Tabs defaultActiveKey="1" type="card" size={size}>
                                    <TabPane tab="账号管理" key="1">
                                        <Space direction="vertical" size="middle" style={{width:'100%'}}>
                                            <Form
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
                                                    name="password"
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
                                                <Form.Item name="gender" label="权限" rules={[{ required: true }]}>
                                                    <Select
                                                        placeholder="请选择权限"
                                                        onChange={onGenderChange}
                                                        allowClear
                                                    >
                                                        <Option value="admin">管理员</Option>
                                                        <Option value="use">普通用户</Option>
                                                    </Select>
                                                </Form.Item>

                                                <Form.Item >
                                                    <Button type="primary" htmlType="submit" style={{width:'100%'}}>
                                                        添加
                                                    </Button>
                                                </Form.Item>
                                            </Form>
                                        </Space>
                                    </TabPane>
                                    <TabPane tab="权限管理" key="2">
                                        <Table columns={columns} dataSource={data}
                                               title={() => '用户组'}/>
                                    </TabPane>
                                </Tabs>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default AccountManager;
