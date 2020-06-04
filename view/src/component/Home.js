import React, {Component} from 'react';
import Login from "./login/Login";
import { Button, Tooltip } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import UpdatePassword from "./login/UpdatePassword";

class Home extends Component {

    constructor(props) {
        super(props);
        this.state={
            showLogin:false,
            showCreateAccount:false,
            showUpdatePassword:false,
        }
        this.showLogin=this.showLogin.bind(this);
        this.showUpdatePassword=this.showUpdatePassword.bind(this);
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



    render() {
        let loginView=this.state.showLogin?<Login showUpdatePassword={this.showUpdatePassword} showLogin={this.showLogin}  className="btn btn-primary float-right mr-5 mt-3"></Login>:"";
        let updatePassword=this.state.showUpdatePassword?<UpdatePassword showUpdatePassword={this.showUpdatePassword}></UpdatePassword>:"";
        return (
            <div>
                <Button type="primary" shape="circle" size="large"  onClick={e => this.onClick(e)}  className="btn btn-primary float-right mr-5 mt-3">
                    登录
                </Button>
                {loginView}
                {updatePassword}
            </div>
        );
    }
}

export default Home;
