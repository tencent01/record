import React, {Component} from 'react';
import E from "wangeditor";
import url from "../../../network/url";
import request from "../../../network/request";

class AddSolve extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const elem = this.refs.editorElem;
        const editor = new E(elem);
        editor.customConfig.uploadImgServer = url.home+url.blog+url.upload+url.img;
        editor.customConfig.customUploadImg=(files, insert)=>{
            let data = new FormData();
            data.append("files", files[0]);
            request.uploadImg(data,this.props.token).then(response=>{
                return response.json();
            }).then(data=>{
                insert(url.home+data.url);
                return data;
            })
        }
        // 使用 onchange 函数监听内容的变化，并实时更新到 state 中
        editor.customConfig.onchange = html => {
            console.log(html)
            this.props.onBlogSolve(html);
            this.setState({
                editorContent: html
            })
        }
        editor.create()
    }

    render() {
        return (
            <div ref="editorElem" style={{textAlign: 'left', width: "100%", margin: '10px auto'}} className="add_blog_solve">
            </div>
        );
    }
}

export default AddSolve;
