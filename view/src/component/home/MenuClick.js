import React, {Component} from 'react';

import { Modal, Button } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';

class MenuClick extends Component {
    constructor(props) {
        super(props);
        this.state={
            translateX: 0,
            translateY: 0
        };
    }

    render() {
        const onClickNew=()=>{
            this.props.onShowCreateBlog(true);
        }

        const onClickDelete=()=>{
            Modal.confirm({
                title: '请确认',
                icon: <ExclamationCircleOutlined />,
                content: '确认删除分类吗？',
                okText: '确认',
                cancelText: '取消',
                onOk:()=>{
                    this.props.onClickDeleteRecord();
                    console.log("bbbbbbbbbbbbbb")}
            });
            // this.props.onClickDeleteRecord();
        }

        const onClickDeleteRecord=()=>{
            Modal.confirm({
                title: '请确认',
                icon: <ExclamationCircleOutlined />,
                content: '确认删除项目吗?',
                okText: '确认',
                cancelText: '取消',
                onOk:()=>{
                    this.props.onDeleteRecord();
                    console.log("aaaaa")}

            });
            // this.props.onDeleteRecord();
        }

        const onClickNewRecord=()=>{
            this.props.onClickNewRecord(true);
        }
        const onClickShowRecord=()=>{
            this.props.onClickShowRecord();
        }
        const onClickAddRecord=()=>{
            this.props.onClickAddRecord();
        }

        const onClickRefreshRecord=()=>{
            this.props.onClickRefreshRecord();
        }
        const onClickAccount=()=>{
            this.props.onClickAccount(true);
        }

        const onClickSearchRecord=()=>{
            this.props.showBlogSearch(true);
        }



        return (
            <div  style={{transform: `translateX(${this.props.clientX}px)translateY(${this.props.clientY}px)`,position:'absolute',width:'200px',border:'1px #ccc solid',padding:'2px 0',backgroundColor:'white',boxShadow:'5px 5px 5px #ccc'}}>

                <div className="menu_click_item" onClick={onClickRefreshRecord}  style={{height:'25px',margin:'4px 0',padding:'0 10px',cursor:'pointer'}}>刷新项目</div>
                <div className="menu_click_item" onClick={onClickNew} style={{height:'25px',margin:'4px 0',padding:'0 10px',cursor:'pointer',hover:'color:#FD482C'}}>新建项目</div>
                {/*<div className="menu_click_item" style={{height:'25px',margin:'4px 0',padding:'0 10px',cursor:'pointer'}}>新建目录</div>*/}
                <div className="menu_click_item" onClick={onClickNewRecord}  style={{height:'25px',margin:'4px 0',padding:'0 10px',cursor:'pointer'}}>新建分类</div>
                <div className="menu_click_item" onClick={onClickAddRecord}  style={{height:'25px',margin:'4px 0',padding:'0 10px',cursor:'pointer'}}>添加解决方案</div>
                <div className="menu_click_item" style={{borderTop:'1px #ccc solid',height:'1px'}}></div>
                <div className="menu_click_item" onClick={onClickSearchRecord} style={{height:'25px',margin:'4px 0',padding:'0 10px',cursor:'pointer'}}>查找项目</div>
                <div className="menu_click_item" onClick={onClickShowRecord} style={{height:'25px',margin:'4px 0',padding:'0 10px',cursor:'pointer'}}>查看项目</div>
                <div className="menu_click_item" onClick={onClickDeleteRecord} style={{height:'25px',margin:'4px 0',padding:'0 10px',cursor:'pointer'}}>删除项目</div>
                <div className="menu_click_item" onClick={onClickDelete} style={{height:'25px',margin:'4px 0',padding:'0 10px',cursor:'pointer'}}>删除分类</div>
                <div className="menu_click_item" onClick={onClickAccount}  style={{height:'25px',margin:'4px 0',padding:'0 10px',cursor:'pointer'}}>账号管理</div>

            </div>
        );
    }
}

export default MenuClick;
