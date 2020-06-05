import React, {Component} from 'react';
import { Menu,Tree,TreeNode } from 'antd';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';

class ProblemMenu extends Component {

    constructor() {
        super();
        this.state={
            openKeys:['sub1'],
        }
        this.onOpenChange=this.onOpenChange.bind(this);
    }

    rootSubmenuKeys = ['sub1', 'sub2', 'sub4'];

    onOpenChange = openKeys => {
        const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1);
        if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
            this.setState({ openKeys });
        } else {
            this.setState({
                openKeys: latestOpenKey ? [latestOpenKey] : [],
            });
        }
    };

    render() {
        const { SubMenu } = Menu;
        return (
            <div className="overflow-auto" style={{width: 256 ,height:window.innerHeight}}>
                    <Menu
                        mode="inline"
                        style={{  }}
                    >
                        <SubMenu key="sub1" title={<span><MailOutlined /><span>Navigation One</span></span>}>
                            <Menu.Item key="11">Option 1</Menu.Item>
                            <Menu.Item key="12">Option 2</Menu.Item>
                            <Menu.Item key="13">Option 3</Menu.Item>
                            <Menu.Item key="14">Option 4</Menu.Item>
                        </SubMenu>
                        <SubMenu key="sub2" icon={<AppstoreOutlined />} title="Navigation Two">
                            <Menu.Item key="25">Option 5</Menu.Item>
                            <Menu.Item key="26">Option 6</Menu.Item>

                            <SubMenu key="sub3" title="Submenu">
                                <Menu.Item key="37">Option 7</Menu.Item>
                                <Menu.Item key="38">Option 8</Menu.Item>
                            </SubMenu>
                            <SubMenu key="sub5" title="Submenu">
                                <Menu.Item key="59">Option 9</Menu.Item>
                                <Menu.Item key="510">Option 10</Menu.Item>
                                <SubMenu key="sub511" title="Submenu">
                                    <Menu.Item key="5111">Option 9</Menu.Item>
                                    <Menu.Item key="5112">Option 10</Menu.Item>
                                    <SubMenu key="sub5113" title="Submenu">
                                        <Menu.Item key="51131">Option 9</Menu.Item>
                                        <Menu.Item key="51132">Option 10</Menu.Item>
                                        <SubMenu key="sub51133" title="Submenu">
                                            <Menu.Item key="511331">Option 9</Menu.Item>
                                            <Menu.Item key="511332">Option 10</Menu.Item>
                                            <SubMenu key="sub511333" title="Submenu">
                                                <Menu.Item key="51133133">Option 9</Menu.Item>
                                                <Menu.Item key="51133236">Option 10</Menu.Item>
                                            </SubMenu>
                                        </SubMenu>
                                    </SubMenu>
                                </SubMenu>
                            </SubMenu>
                        </SubMenu>
                        <SubMenu key="sub4" icon={<SettingOutlined />} title="Navigation Three">
                            <Menu.Item key="49">Option 9</Menu.Item>
                            <Menu.Item key="410">Option 10</Menu.Item>
                            <Menu.Item key="411">Option 11</Menu.Item>
                            <Menu.Item key="412">Option 12</Menu.Item>
                            <SubMenu key="sub413" title="Submenu">
                                <Menu.Item key="4131">Option 9</Menu.Item>
                                <Menu.Item key="4132">Option 10</Menu.Item>
                            </SubMenu>
                            <SubMenu key="sub414" title="Submenu">
                                <Menu.Item key="4141">Option 9</Menu.Item>
                                <Menu.Item key="4142">Option 10</Menu.Item>
                            </SubMenu>
                        </SubMenu>
                    </Menu>
            </div>
        );
    }
}

export default ProblemMenu;
