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

class Home extends Component {

    constructor(props) {
        super(props);
        this.state={
            showLogin:false,
            showCreateAccount:false,
            showUpdatePassword:false,
            showRecordMenu:true,
            showCreateRecord:true,
        }
        this.showLogin=this.showLogin.bind(this);
        this.showUpdatePassword=this.showUpdatePassword.bind(this);
        this.onShowMenuAndTree=this.onShowMenuAndTree.bind(this);
        this.onShowCreateRecord=this.onShowCreateRecord.bind(this);
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


    render() {
        let loginView=this.state.showLogin?<Login showUpdatePassword={this.showUpdatePassword} showLogin={this.showLogin}  className="btn btn-primary float-right mr-5 mt-3"></Login>:"";
        let updatePassword=this.state.showUpdatePassword?<UpdatePassword showUpdatePassword={this.showUpdatePassword}></UpdatePassword>:"";
        let menuAndTree=this.state.showRecordMenu?<MenuAndTree onShowMenuAndTree={this.onShowMenuAndTree}></MenuAndTree>:"";
        let createBlog=this.state.showCreateRecord?<CreateBlog onShowCreateRecord={this.onShowCreateRecord}></CreateBlog>:"";
        return (
            <div>
                <Button type="primary" shape="circle" size="large"  onClick={e => this.onClick(e)}  className="btn btn-primary float-right mr-5 mt-3" >
                    登录
                </Button>
                {menuAndTree}
                {createBlog}
                {loginView}
                {updatePassword}
                {/*<CkEditorDome></CkEditorDome>*/}
                {/*<MenuTree></MenuTree>*/}
            </div>
        );
    }
}

export default Home;
