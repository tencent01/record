import React, {Component} from 'react';
import E from 'wangeditor';
import CKEditor from "@ckeditor/ckeditor5-react";
import './style.css'

class BlogSolve extends Component {
    constructor(props) {
        super(props);
        // this.onSubmitClick=this.onSubmitClick.bind(this);
    }

    componentDidMount() {
        const elem = this.refs.editorElem
        const editor = new E(elem)
        // 使用 onchange 函数监听内容的变化，并实时更新到 state 中
        editor.customConfig.onchange = html => {
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
