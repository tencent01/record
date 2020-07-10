import React, {Component} from 'react';
import { Input } from 'antd';
import { AudioOutlined } from '@ant-design/icons';
import request from "../../network/request";
import { List, Avatar, Button, Skeleton } from 'antd';
import InfiniteScroll from 'react-infinite-scroller';

class BlogSearch extends Component {
    constructor(props) {
        super(props);
        this.state={
            translateX: 0,
            translateY: 0,
            initLoading: true,
            loading: false,
            hasMore: true,
            data: [],
            list: [],
            searchValue:null,
            pageSize:10,
            pageNow:1
        };
        this.moving = false;
        this.lastX = null;
        this.lastY = null;
        window.onmouseup = e => this.onMouseUp(e);
        window.onmousemove = e => this.onMouseMove(e);
        window.ontouchend = e => this.onMouseUp(e);
        window.ontouchmove = e => this.onTouchMove(e);

        this.onHandleClick=this.onHandleClick.bind(this);
        this.onSearchHandler=this.onSearchHandler.bind(this);
        this.onHandleItemClick=this.onHandleItemClick.bind(this);
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
        this.props.showBlogSearch(false);
    }
    onSearchHandler(value){
        this.setState({
            searchValue:value
        })
        request.recordSearch({search:value,pageNow:1,pageSize:this.state.pageSize}).then(response=>{
            return response.json();
        }).then(data=>{
            console.log(data)
            this.setState({
                initLoading: false,
                data: data,
                list: data,
                pageNow:1,
                hasMore:true,
                loading: false
            });
            console.log(data);
        })
    }

    handleInfiniteOnLoad = () => {
        console.log("load---------------------------------")
        let { list } = this.state;
        this.setState({
            loading: true,
        });
        /*if (list.length > 14) {
            this.setState({
                hasMore: false,
                loading: false,
            });
            return;
        }*/
        this.setState({
            pageNow:this.state.pageNow+1
        },()=>{
            request.recordSearch({search:this.state.searchValue,pageNow:this.state.pageNow,pageSize:this.state.pageSize}).then(response=>{
                return response.json();
            }).then(data=>{
                try{
                    console.log(this.state.pageNow)
                    console.log(this.state.data)
                    /*for (let i = 0; i < data.length; i++) {
                        this.state.data.push(data[i])
                    }*/
                    // this.state.data.push(...data)
                    this.state.list.push(...data)
                    this.setState({
                        initLoading: false,
                        loading: false,
                        hasMore:true
                    });
                    console.log(data);
                }catch (e) {

                }

            })
        })

    };

    onHandleItemClick(e,key){
        e.preventDefault();
        request.readFile({keys:key},this.props.token).then(response=>{
            console.log(response)
            if(response.status==200){
                return response.text();
            }else{
                return "不支持此格式"
            }
            // return response.text();
        }).then(data=>{
            this.props.onRecordViewData(true,data)
            return data;
        })
    }


    render() {

        const { Search } = Input;
        const cursorStyle = {
            cursor:this.state.cursorStyle ? 'pointer' : 'default'
        };

        const suffix = (
            <AudioOutlined
                style={{
                    fontSize: 16,
                    color: '#1890ff',
                }}
            />
        );

        const { initLoading, loading, list } = this.state;
        const loadMore =
            !initLoading && !loading ? (
                <div
                    style={{
                        textAlign: 'center',
                        marginTop: 12,
                        height: 32,
                        lineHeight: '32px',
                    }}
                >
                </div>
            ) : null;

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
                            查找项目
                            <button onClick={this.onHandleClick} type="button" className="close" aria-label="关闭">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div style={{float:'left',width:"100%"}} className="ml-5">
                            <div style={{width:"85%"}}>
                                <Search placeholder="输入查找内容" onSearch={value => {this.onSearchHandler(value)

                                }
                                } enterButton />
                            </div>
                            <div  style={{height:window.innerHeight-200,overflow:'auto',width:'95%'}}>
                                <InfiniteScroll
                                    initialLoad={false}
                                    pageStart={0}
                                    loadMore={this.handleInfiniteOnLoad}
                                    hasMore={!this.state.loading && this.state.hasMore}
                                    useWindow={false}
                                >
                                <List
                                    className="demo-loadmore-list"
                                    loading={initLoading}
                                    itemLayout="horizontal"
                                    loadMore={loadMore}
                                    dataSource={list}
                                    renderItem={item => (
                                        <List.Item  key={item.filePath}>
                                            <Skeleton avatar title={false} loading={item.loading} active>
                                                <List.Item.Meta
                                                    title={<a onClick={(event )=>this.onHandleItemClick(event,item.filePath)} href="#">{item.blogname}</a>}
                                                    description={item.blogdescription}
                                                />
                                            </Skeleton>
                                        </List.Item>
                                    )}
                                />
                                </InfiniteScroll>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default BlogSearch;
