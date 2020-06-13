import React, {Component} from 'react';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'// 封装的fetch上传组件
import MyUploadAdapter from "./MyUploadAdapter";
// import DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';
// import { imageUpload } from '@/services/api';
// 引入中文包
import '@ckeditor/ckeditor5-build-classic/build/translations/zh-cn';

class BlogSolveCk extends Component {
    render() {
        // 自定图片上传组件
        const MyCustomUploadAdapterPlugin = ( editor ) => {
            editor.plugins.get( 'FileRepository' ).createUploadAdapter = ( loader ) => {
                // 抓取图片上传状态
                loader.uploadType = this.uploadType.bind(this)

                return new MyUploadAdapter( loader );
            };
        }
        return (
            <CKEditor

                config={{
                    language:'zh-cn',
                    extraPlugins:[MyCustomUploadAdapterPlugin],
                }
                }
                editor={ ClassicEditor }
                data=""
                onInit={ editor => {
                    // You can store the "editor" and use when it is needed.
                    console.log( 'Editor is ready to use!', editor );
                } }
                onChange={ ( event, editor ) => {
                    const data = editor.getData();
                    this.props.onBlogSolve(data,this.props.fieldName);
                    console.log( { event, editor, data } );
                } }
                onBlur={ ( event, editor ) => {
                    console.log( 'Blur.', editor );
                } }
                onFocus={ ( event, editor ) => {
                    console.log( 'Focus.', editor );
                } }
            />
        );
    }
}


export default BlogSolveCk;
