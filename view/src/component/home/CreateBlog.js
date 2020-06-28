import React, {Component} from 'react';
import BlgDescription from "./blog/BlgDescription";
import BlogSolve from "./blog/BlogSolve";
import { Form, Input, Button, Checkbox,Select,Space  } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import request from "../../network/request";
import BlgDescriptionCk from "./blog/BlgDescriptionCK";
import BlogSolveCk from "./blog/BlogSolveCK";
const { Option } = Select;

class CreateBlog extends Component {

    constructor(props) {
        super(props);
        this.state={
            translateX: 0,
            translateY: 0,
            blgdescription:null,
            blogsolves: new Map(),
        };
        this.moving = false;
        this.lastX = null;
        this.lastY = null;
        window.onmouseup = e => this.onMouseUp(e);
        window.onmousemove = e => this.onMouseMove(e);
        window.ontouchend = e => this.onMouseUp(e);
        window.ontouchmove = e => this.onTouchMove(e);
        this.handleChange=this.handleChange.bind(this);
        this.onBlogDescription=this.onBlogDescription.bind(this);
        this.onBlogSolve=this.onBlogSolve.bind(this);
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
    handleChange(value) {

        // console.log(value); // { key: "lucy", label: "Lucy (101)" }
    }

    onBlogDescription(content){
        // console.log(content)
        this.setState({
            blgdescription:content,
        })
    }
    onBlogSolve(content,fieldName){
        this.state.blogsolves.delete(fieldName);
        this.state.blogsolves.set(fieldName,content);
        // console.log(this.state.blogsolves)
    }

    onHandleClick(){
        this.props.onShowCreateRecord(false);
    }

    render() {
        const cursorStyle = {
            cursor:this.state.cursorStyle ? 'pointer' : 'default'
        };

        const formItemLayout = {
            labelCol: { span: 0 },
            wrapperCol: { span: 8 },
        };
        const formTailLayout = {
            labelCol: { span: 0 },
            wrapperCol: { span: 8, offset: 4 },
        };


        const onCheck = async () => {
            try {
            } catch (errorInfo) {
                console.log('Failed:', errorInfo);
            }
        };

        const onFinish = values => {
            values.blgdescription=this.state.blgdescription;
            this.state.blogsolves.forEach((value,key,map)=>{
                let blogsolve=new Object();
                blogsolve["blogsolve"]=value;
                values.blogsolves[key]=blogsolve;
            })
            let node=this.props.onNodeData;
            console.log(node)
            if(node!=null){
                if(node.isLeaf){
                    let keyturl = node.key.substr(0,node.key.lastIndexOf('\\'));
                    values.path=keyturl;
                }else{
                    values.path=node.key;
                }
            }else{
                values.path=null;
            }

            console.log(values)
            request.newBlog(values,this.props.token).then(res=>{
                return res.json();
            }).then(data=>{
                console.log(data)
                if(data.codeCheck){
                    this.props.onGetAllFileData(data.msg);
                }
                return data;
            })
            console.log('Received values of form: ', values);
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
                        <div style={{width:"100%",height:window.innerHeight-100,overflow:'auto'}} className="pl-5" >
                            <div style={{height: 10,}} >
                                <Form  name="dynamic_rule"
                                       onFinish={onFinish}
                                >
                                    <Form.Item
                                        {...formItemLayout}
                                        name="blogname"
                                        label="记录名称"
                                        rules={[
                                            {
                                                required: true,
                                                message: '请输入你的记录名称',
                                            },
                                        ]}
                                    >
                                        <Input placeholder="请输入你的记录名称" />
                                    </Form.Item>

                                    <Form.Item
                                        labelCol={{ span: 2}}
                                        wrapperCol={{ span: 8}}
                                        name="helpusername"
                                        label="协 助 人"
                                        rules={[
                                            {
                                                message: '请输入协助人员',
                                            },
                                        ]}
                                    >
                                        <Input placeholder="请输入协助人员" />
                                    </Form.Item>
                                    <Form.Item
                                        labelCol={{ span: 2}}
                                        wrapperCol={{ span: 8}}
                                        name="blogstate"
                                        label="记录状态"
                                        rules={[
                                        {
                                            required:true,
                                            message: '请选择状态',
                                        },
                                    ]}
                                    >
                                        <Select
                                            labelInValue
                                            onChange={this.handleChange}
                                            placeholder="请选择状态"
                                        >
                                            <Option value="ing">记录中</Option>
                                            <Option value="ok">记录完成</Option>
                                            <Option value="wait">记录暂缓</Option>
                                        </Select>
                                    </Form.Item>
                                    <Form.Item
                                        labelCol={{ span: 2}}
                                        wrapperCol={{ span: 20}}
                                        name="blgdescription"
                                        label="记录描述"
                                    >

                                        <div style={{width:"95%"}}>
                                            <BlgDescription onBlogDescription={this.onBlogDescription}></BlgDescription>
                                            {/*<BlgDescription onBlogDescription={this.onBlogDescription}></BlgDescription>*/}
                                        </div>
                                    </Form.Item>
                                    {/*<Form.Item
                                        labelCol={{ span: 2}}
                                        wrapperCol={{ span: 20}}
                                        name="blgdesolve"
                                        label="记录过程"
                                        rules={[
                                            {
                                                message: '请输入记录过程',
                                            },
                                        ]}
                                    >
                                        <BlogSolve></BlogSolve>
                                    </Form.Item>*/}

                                    <Form.List name="blogsolves">
                                        {(fields, { add, remove }) => {
                                            return (
                                                <div>
                                                    {fields.map(field => (
                                                        <div key={field.key}  align="start">

                                                            <Form.Item
                                                                {...field}
                                                                name={[field.name, 'first']}
                                                                label="记录过程"
                                                                labelCol={{ span: 2}}
                                                                wrapperCol={{ span: 20}}
                                                                fieldKey={[field.fieldKey, '    first']}
                                                                rules={[{message: 'Missing first name' }]}
                                                            >

                                                                <div style={{float:"left",width:"95%"}}>
                                                                    <BlogSolve onBlogSolve={this.onBlogSolve} fieldName={field.name}></BlogSolve>
                                                                </div>
                                                                <MinusCircleOutlined
                                                                    style={{float:"left"}}
                                                                    onClick={() => {
                                                                        console.log("field",field);
                                                                        console.log("field",fields);
                                                                        this.state.blogsolves.delete(field.name);
                                                                        console.log(this.state.blogsolves)
                                                                        remove(field.name);
                                                                    }}
                                                                />
                                                            </Form.Item>
                                                        </div>
                                                    ))}

                                                    <Form.Item
                                                        labelCol={{ span: 2}}
                                                        wrapperCol={{ span: 22}}

                                                        style={{ width: '96%' }}
                                                    >
                                                        <Button
                                                            type="dashed"
                                                            onClick={() => {
                                                                // console.log("fields",fields)
                                                                // console.log(this.state.blogsolves)
                                                                add();
                                                            }}
                                                            block
                                                        >
                                                            <PlusOutlined /> 添加记录过程
                                                        </Button>
                                                    </Form.Item>
                                                </div>
                                            );
                                        }}
                                    </Form.List>
                                    <Form.Item
                                        wrapperCol={{offset: 10}}>
                                        <Button type="primary" htmlType="submit"  onClick={onCheck}>
                                            提交记录
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
