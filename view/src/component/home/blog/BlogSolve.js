import React, {Component} from 'react';
import E from 'wangeditor';
import CKEditor from "@ckeditor/ckeditor5-react";
import './style.css'
import request from "../../../network/request";
import url from "../../../network/url";

class BlogSolve extends Component {
    constructor(props) {
        super(props);
        // this.onSubmitClick=this.onSubmitClick.bind(this);
    }

    componentDidMount() {
        const elem = this.refs.editorElem;
        const editor = new E(elem);
        editor.customConfig.uploadImgServer = url.home+url.blog+url.upload+url.img;
        editor.customConfig.customUploadImg=(files, insert)=>{
            let data = new FormData();
            data.append("files", files[0]);
            request.uploadImg(data).then(response=>{
                return response.json();
            }).then(data=>{
                insert(url.home+data.url);
                return data;
            })
        }
        // 使用 onchange 函数监听内容的变化，并实时更新到 state 中
        editor.customConfig.onchange = html => {
            this.props.onBlogSolve(html,this.props.fieldName);
            this.setState({
                editorContent: html
            })
        }
        editor.create()
    }

    onSubmitClick(){
        console.log(this.state.editorContent);
    }

    render() {
        return (
            <div ref="editorElem" style={{textAlign: 'left', width: "100%", margin: '10px auto'}} className="blog_solve">
            </div>
        );
    }
}

export default BlogSolve;
