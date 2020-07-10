import React, {Component} from 'react';
import { Button, notification } from 'antd';
import { SmileOutlined } from '@ant-design/icons';

class AntAlert extends Component {


    constructor(prors) {
        super(prors);
        // this.state={
        //     translateX: 0,
        //     translateY: 150,
        // };
        // this.moving = false;
        // this.lastX = null;
        // this.lastY = null;
        // window.onmouseup = e => this.onMouseUp(e);
        // window.onmousemove = e => this.onMouseMove(e);
        // window.ontouchend = e => this.onMouseUp(e);
        // window.ontouchmove = e => this.onTouchMove(e);
        // this.onHandleClick=this.onHandleClick.bind(this);
        // this.onHandleShowCreateAccount=this.onHandleShowCreateAccount.bind(this);
        // this.onSubmittClick=this.onSubmittClick.bind(this);
        // this.onChangePassword=this.onChangePassword.bind(this);;
        // this.onHandleShowUpdatePassword=this.onHandleShowUpdatePassword.bind(this);
    }

    render() {
        const openNotification = () => {
            notification.open({
                message: 'Notification Title',
                description:
                    'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
                onClick: () => {
                    console.log('Notification Clicked!');
                },
                icon: <SmileOutlined style={{ color: '#108ee9' }} />,
            });
        };
        return (
            <Button type="primary" onClick={openNotification}>
                Open the notification box
            </Button>
        );
    }
}

export default AntAlert;
