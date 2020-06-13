export default class MyUploadAdapter{
    constructor( loader ) {
        this.loader = loader;
    }
    upload () {

        /*
           注意此处的uploadType方法。
          这是我在index,js中 自己定义了一个uploadType函数，并放在了
          loader中一起传了过来：
          const MyCustomUploadAdapterPlugin = ( editor ) => {
            editor.plugins.get( 'FileRepository' ).createUploadAdapter = ( loader ) => {
              // 抓取图片上传状态
              loader.uploadType = this.uploadType.bind(this)
              return new MyUploadAdapter( loader );
            };
          }
        */
        this.loader.uploadType(true);
        return this.loader.file.then(file=>{
            console.log(file);
        });
    }
    // Aborts the upload process.
    abort() {
        console.log('暂停上传')
    }
}
