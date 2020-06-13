import React, {Component} from 'react';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
// 引入中文包
import '@ckeditor/ckeditor5-build-classic/build/translations/zh-cn';

class BlgDescriptionCk extends Component {
    render() {
        return (
            <CKEditor
                editor={ ClassicEditor }
                data=""
                onInit={ editor => {
                    // You can store the "editor" and use when it is needed.
                    console.log( 'Editor is ready to use!', editor );
                } }
                onChange={ ( event, editor ) => {
                    const data = editor.getData();
                    this.props.onBlogDescription(data);
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

export default BlgDescriptionCk;
