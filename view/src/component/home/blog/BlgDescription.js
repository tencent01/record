import React, {Component} from 'react';
import E from 'wangeditor';
import './style.css'
import url from "../../../network/url";
import request from "../../../network/request";

class BlgDescription extends Component {
    constructor(props) {
        super(props);
    }





    componentDidMount() {
        const elem = this.refs.editorElem;
        const editor = new E(elem);
        editor.customConfig.uploadImgServer = url.home+url.blog+url.upload+url.img;
        /*editor.customConfig.uploadImgHooks={
            before: function (xhr, editor, files) {
                // 图片上传之前触发
                // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象，files 是选择的图片文件
                console.log(files)
                // 如果返回的结果是 {prevent: true, msg: 'xxxx'} 则表示用户放弃上传
                // return {
                //     prevent: true,
                //     msg: '放弃上传'
                // }
            },
            success: function (xhr, editor, result) {
                // 图片上传并返回结果，图片插入成功之后触发
                // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象，result 是服务器端返回的结果
            },
            fail: function (xhr, editor, result) {
                // 图片上传并返回结果，但图片插入错误时触发
                // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象，result 是服务器端返回的结果
            },
            error: function (xhr, editor) {
                // 图片上传出错时触发
                // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象
            },
            timeout: function (xhr, editor) {
                // 图片上传超时时触发
                // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象
            },

            // 如果服务器端返回的不是 {errno:0, data: [...]} 这种格式，可使用该配置
            // （但是，服务器端返回的必须是一个 JSON 格式字符串！！！否则会报错）
            customInsert: function (insertImg, result, editor) {
                // 图片上传并返回结果，自定义插入图片的事件（而不是编辑器自动插入图片！！！）
                // insertImg 是插入图片的函数，editor 是编辑器对象，result 是服务器端返回的结果
                // 举例：假如上传图片成功后，服务器端返回的是 {url:'....'} 这种格式，即可这样插入图片：
                let url = result.url
                console.log(url)
                insertImg("https://192.168.1.63/static/img/file_log.jpg")

                // result 必须是一个 JSON 格式字符串！！！否则报错
            }
        };*/
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
            this.props.onBlogDescription(html);
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
            <div ref="editorElem" style={{textAlign: 'left', width: "100%", margin: '10px auto'}} className="blg_description">
            </div>
        );
    }
}

export default BlgDescription;
