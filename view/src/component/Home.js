import React, {Component} from 'react';
import Login from "./login/Login";
import { Button, Tooltip } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import UpdatePassword from "./login/UpdatePassword";
import ProblemMenu from "./home/ProblemMenu";
import MenuTree from "./tools/MenuTree";
import MenuJsTree from "./tools/MenuJsTree";
import RightClickContextMenu from "./tools/RightClickContextMenu";
import MenuAndTree from "./tools/MenuAndTree";
import CkEditorDome from "./tools/CKEditorDome";
import MainForm from "./destop/MainForm";
import WangEditorDome from "./tools/WangEditorDome";
import CreateBlog from "./home/CreateBlog";
import ShowBlog from "./home/ShowBlog";
import MenuClick from "./home/MenuClick";
import request from "../network/request";

class Home extends Component {

    constructor(props) {
        super(props);
        this.state={
            showLogin:false,
            showCreateAccount:false,
            showUpdatePassword:false,
            showRecordMenu:true,
            showCreateRecord:false,
            showRecordView:false,
            recordViewData:null,

            showClickMenu:false,
            showClickMenuClientX:0,
            showClickMenuClientY:0,
            node:null,
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
        }
        this.showLogin=this.showLogin.bind(this);
        this.showUpdatePassword=this.showUpdatePassword.bind(this);
        this.onShowMenuAndTree=this.onShowMenuAndTree.bind(this);
        this.onShowCreateRecord=this.onShowCreateRecord.bind(this);
        this.onRecordViewData=this.onRecordViewData.bind(this);
        this.onShowMeneClick=this.onShowMeneClick.bind(this);
        window.onclick=e=>this.onWindowClick(e);
        this.onShowCreateBlog=this.onShowCreateBlog.bind(this);
        this.onGetAllFileData=this.onGetAllFileData.bind(this);
        this.dataToTree=this.dataToTree.bind(this);
        this.onDeleteRecord=this.onDeleteRecord.bind(this);
        this.onShowRecordView=this.onShowRecordView.bind(this);
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

    onWindowClick(e){
        this.setState({
            showClickMenu:false,
        })
    }

    onClick(e){
        if(!this.state.showLogin&&!this.state.showUpdatePassword){
            this.setState({
                showLogin:true,
            })
        }
    }

    showLogin(value){
        this.setState({
            showLogin:value,
        })
    }
    showUpdatePassword(showUpdatePasswordValue,showLoginValue){
        this.setState({
            showUpdatePassword:showUpdatePasswordValue,
            showLogin:showLoginValue,
        })
    }

    onShowMenuAndTree(showMenuAndTreeValue){
        this.setState({
            showRecordMenu:showMenuAndTreeValue,
        })
    }

    onShowCreateRecord(showCreateRecordValue){
        this.setState({
            showCreateRecord:showCreateRecordValue,
        })
    }

    onRecordViewData(showRecordView,recordViewData){
        this.setState({
            showRecordView:showRecordView,
            recordViewData:recordViewData,
        })
    }

    onShowMeneClick(node,showClickMenu,showClickMenuClientX,showClickMenuClientY){
        this.setState({
            node:node,
            showClickMenu:showClickMenu,
            showClickMenuClientX:showClickMenuClientX,
            showClickMenuClientY:showClickMenuClientY,
        })
    }

    onShowCreateBlog(showCreateRecord){
        this.setState({
            showCreateRecord:showCreateRecord,
        })
    }

    onGetAllFileData(data){
        this.setState({
            showCreateRecord:false,
            treeData:this.dataToTree(data),
        })
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

    onDeleteRecord(){
        console.log(this.state.node)
        if(this.state.node!=null){
            let data=new Object();
            data.key=this.state.node.key;
            request.deleteBlog(data).then(response=>{
                console.log(response)
                return response.json;
            }).then(data=>{
                if(data){
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
            })
        }
    }

    onShowRecordView(value){
        this.setState({
            showRecordView:value,
        })
    }

    render() {
        let loginView=this.state.showLogin?<Login showUpdatePassword={this.showUpdatePassword} showLogin={this.showLogin}  className="btn btn-primary float-right mr-5 mt-3"></Login>:"";
        let updatePassword=this.state.showUpdatePassword?<UpdatePassword showUpdatePassword={this.showUpdatePassword}></UpdatePassword>:"";
        let menuAndTree=this.state.showRecordMenu?<MenuAndTree treeData={this.state.treeData} onShowMeneClick={this.onShowMeneClick} onRecordViewData={this.onRecordViewData} onShowMenuAndTree={this.onShowMenuAndTree}></MenuAndTree>:"";
        let createBlog=this.state.showCreateRecord?<CreateBlog onGetAllFileData={this.onGetAllFileData} onNodeData={this.state.node} onShowCreateRecord={this.onShowCreateRecord}></CreateBlog>:"";
        let showRecordView=this.state.showRecordView?<ShowBlog onShowRecordView={this.onShowRecordView} onShowRecordData={this.state.recordViewData}></ShowBlog>:"";
        let showClickMenuView=this.state.showClickMenu?<MenuClick onDeleteRecord={this.onDeleteRecord} onShowCreateBlog={this.onShowCreateBlog} clientX={this.state.showClickMenuClientX} clientY={this.state.showClickMenuClientY}></MenuClick>:"";
        return (
            <div>
                <Button type="primary" shape="circle" size="large"  onClick={e => this.onClick(e)}  className="btn btn-primary float-right mr-5 mt-3" >
                    登录
                </Button>
                {menuAndTree}
                {showRecordView}
                {createBlog}
                {loginView}
                {updatePassword}
                {/*<CkEditorDome></CkEditorDome>*/}
                {/*<MenuTree></MenuTree>*/}
                {showClickMenuView}
            </div>
        );
    }
}

export default Home;
