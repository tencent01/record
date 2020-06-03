import React, {Component} from 'react';
import Login from "./Login";
import { Button, Tooltip } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

class Home extends Component {

    constructor(props) {
        super(props);
        this.state={
            showCreateAccount:false,
            showLogin:false,
        }
    }
    render() {
        let loginView=this.state.showLogin?"":<Login showCreateAccount={this.showCreateAccount} showLogin={this.showLogin}></Login>;
        return (
            <div>
                <Button type="primary" shape="circle" size="large">
                    登录
                </Button>
                {loginView}
            </div>
        );
    }
}

export default Home;
