import {httpGet,paramGet, httpPost,httpTokenPost} from "./http";
import url from "./url";

const request={
    getChengPei(){
        return httpGet(url.home+url.user+url.login);
    },

    login(param){
        return httpPost(url.home+url.user+url.login,param);
    },

    tokenLogin(param,token){
        return httpTokenPost(url.home+url.user+url.login,param,token);
    },

    updatePassword(param){
        let requestUrl=url.home+url.user+url.update+url.password;
        console.log(requestUrl)
        return httpPost(requestUrl,param);
    },

    getBlogRootDir(){
        let requestUrl=url.home+url.file+url.get;
        console.log(requestUrl)
        return httpGet(requestUrl);
    },

    getAllBlog(){
        let requestUrl=url.home+url.file+url.all;
        console.log(requestUrl)
        return httpGet(requestUrl);
    },
    readFile(path){
        let requestUrl=url.home+url.file+url.read;
        console.log(requestUrl)
        return paramGet(requestUrl,path);
    },
}

export default request;
