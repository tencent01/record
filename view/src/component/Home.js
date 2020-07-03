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
import CreateRecord from "./home/CreateRecord";
import url from "../network/url";
import webSocket from "../network/webSocket";
import AddBlogSolve from "./home/AddBlogSolve";
import AccountManager from "./login/AccountManager";

class Home extends Component {

    constructor(props) {
        super(props);
        this.state={
            showLogin:false,
            token:null,
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
            showCreateRecordView:false,
            showAddSolveView:false,
            showAccountManagerView:false,
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
        this.taskRemindInterval = null;
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
        this.onClickDeleteRecord=this.onClickDeleteRecord.bind(this);
        this.onNodeData=this.onNodeData.bind(this);
        this.onClickNewRecord=this.onClickNewRecord.bind(this);
        this.onAllFileData=this.onAllFileData.bind(this);
        this.onClickShowRecord=this.onClickShowRecord.bind(this);
        this.onClickAddRecord=this.onClickAddRecord.bind(this);
        this.onShowAddSolveView=this.onShowAddSolveView.bind(this);
        this.onClickRefreshRecord=this.onClickRefreshRecord.bind(this);
        this.onClickAccount=this.onClickAccount.bind(this);
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

    showLogin(value,token){
        this.setState({
            token:token,
            showLogin:value,
        },()=>{
            this.socket=new webSocket({
                socketUrl:url.ws+url.colon+url.tworoot+url.ip+url.websocket,//+"?token="+this.state.token,
                timeout:5000,
                token:this.state.token,
                socketMessage:(receive)=>{
                    console.log(receive);
                },
                socketClose:(msg)=>{
                    console.log(msg);
                },
                socketError:()=>{
                    console.log(this.state.taskState+'连接建立失败');
                },
                socketOpen:()=>{
                    console.log('连接建立成功');
                    // 心跳机制 定时向后端发数据
                    this.taskRemindInterval = setInterval(() => {
                        this.socket.sendMessage({ "msgType": "heartbeat"
                        ,token:this.state.token})
                    }, 30000)
                },
            });
            // 重试创建socket连接
            try {
                this.socket.connection();
            } catch (e) {
                // 捕获异常，防止js error
                // donothing
            }
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

    onShowMeneClick(showClickMenu,showClickMenuClientX,showClickMenuClientY){
        console.log(this.state.node)
        this.setState({
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

    onAllFileData(data){
        this.setState({
            showCreateRecordView:false,
            treeData:this.dataToTree(data),
        })
    }

    dataToTree(data){
        let newTreeData=[];
        if(data!=null){
            for (let i = 0; i <data.length ; i++) {
                let dataItem=data[i];
                let dataJson=new Object();
                if(dataItem.state==0){
                    dataJson.title=dataItem.name;
                }else if(dataItem.state==1){
                    dataJson.title=<span style={{ color: '#FF0000' }}>{dataItem.name}</span>;
                }else if(dataItem.state==2){
                    dataJson.title=<span style={{ color: '#32CD99' }}>{dataItem.name}</span>;
                }
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
        if(this.state.node!=null&&this.state.node.isLeaf){
            let data=new Object();
            data.key=this.state.node.key;
            request.deleteBlog(data,this.state.token).then(response=>{
                console.log(response)
                return response.json;
            }).then(data=>{
                console.log(data)
                this.setState({
                    treeData:this.dataToTree(data),
                })
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

    onClickDeleteRecord(){
        let data=new Object();
        if(this.state.node!=null){
            data.path=this.state.node.key;
        }else{
            data.path=null;
        }
        request.deleteRecord(data,this.state.token).then(response=>{
            return response.json();
        }).then(data=>{
            this.setState({
                treeData:this.dataToTree(data),
            })
            console.log(data);
        })
    }

    onClickNewRecord(value){
        this.setState({
            showCreateRecordView:value,
        })
    }

    onNodeData(node){
        this.setState({
            node:node,
        })
    }

    objToString(obj) {
        var arr=[];
        var index=0;
        for(let item in obj){
            arr[index++]=[item,obj[item]]
        }
        return new URLSearchParams(arr).toString();
    }

    onClickShowRecord(){
        if(this.state.node!=null){
            if(this.state.node.isLeaf){
                const win=window.open(url.home+url.blog+url.get+"?keys="+this.state.node.key.replace("\\","/"));
            }else{
                console.log("dir")
            }
        }
    }

    onClickAddRecord(){
        this.setState({
            showAddSolveView:true
        })
    }

    onShowAddSolveView(onShowAddSolveView){
        this.setState({
            showAddSolveView:onShowAddSolveView
        })
    }

    onClickRefreshRecord(){
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

    onClickAccount(value){
        this.setState({
            showAccountManagerView:value
        })
    }

    render() {
        const newRecordPathValue=()=>{
            if(this.state.node!=null){
                if(this.state.node.isLeaf){
                    let endIndex=this.state.node.key.lastIndexOf("\\");
                    let path=this.state.node.key.substr(0,endIndex);
                    return path+"\\";
                }else{
                    return this.state.node.key+"\\";
                }
            }
            return "";
        }
        let loginView=this.state.showLogin?<Login showUpdatePassword={this.showUpdatePassword} showLogin={this.showLogin}  className="btn btn-primary float-right mr-5 mt-3"></Login>:"";
        let updatePassword=this.state.showUpdatePassword?<UpdatePassword showUpdatePassword={this.showUpdatePassword}></UpdatePassword>:"";
        let menuAndTree=this.state.showRecordMenu?<MenuAndTree token={this.state.token} onNodeData={this.onNodeData}  treeData={this.state.treeData} onShowMeneClick={this.onShowMeneClick} onRecordViewData={this.onRecordViewData} onShowMenuAndTree={this.onShowMenuAndTree}></MenuAndTree>:"";
        let createBlog=this.state.showCreateRecord?<CreateBlog token={this.state.token} onGetAllFileData={this.onGetAllFileData} onNodeData={this.state.node} onShowCreateRecord={this.onShowCreateRecord}></CreateBlog>:"";
        let showRecordView=this.state.showRecordView?<ShowBlog onShowRecordView={this.onShowRecordView} onShowRecordData={this.state.recordViewData}></ShowBlog>:"";
        let showClickMenuView=this.state.showClickMenu?<MenuClick onClickAccount={this.onClickAccount} onClickRefreshRecord={this.onClickRefreshRecord} onClickAddRecord={this.onClickAddRecord} onClickShowRecord={this.onClickShowRecord} onClickNewRecord={this.onClickNewRecord} onClickDeleteRecord={this.onClickDeleteRecord} onDeleteRecord={this.onDeleteRecord} onShowCreateBlog={this.onShowCreateBlog} clientX={this.state.showClickMenuClientX} clientY={this.state.showClickMenuClientY}></MenuClick>:"";
        let showCreateRecordView=this.state.showCreateRecordView?<CreateRecord token={this.state.token} onAllFileData={this.onAllFileData} newRecordPathValue={newRecordPathValue()} onClickNewRecord={this.onClickNewRecord}></CreateRecord>:"";

        let showAddSolveView=this.state.node!=null?(this.state.showAddSolveView?<AddBlogSolve nodeKey={this.state.node.key} token={this.state.token} onShowAddSolveView={this.onShowAddSolveView} onShowRecordData={this.state.recordViewData}></AddBlogSolve>:""):"";

        let showAccountManagerView=this.state.showAccountManagerView?<AccountManager showAccountManager={this.onClickAccount}></AccountManager>:"";
        return (
            <div>
                <Button type="primary" shape="circle" size="large"  onClick={e => this.onClick(e)}  className="btn btn-primary float-right mr-5 mt-3" >
                    登录
                </Button>
                {menuAndTree}
                {showAccountManagerView}
                {showRecordView}
                {createBlog}
                {showAddSolveView}
                {loginView}
                {updatePassword}
                {/*<CkEditorDome></CkEditorDome>*/}
                {/*<MenuTree></MenuTree>*/}
                {showClickMenuView}
                {showCreateRecordView}

            </div>
        );
    }
}

export default Home;
