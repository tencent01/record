import {httpGet, httpPost} from "./http";
import url from "./url";

const request={
    getChengPei(){
        return httpGet(url.home+url.user+url.login);
    },

    login(param){
        return httpPost(url.home+url.user+url.login,param);
    },

    updatePassword(param){
        let requestUrl=url.home+url.user+url.update+url.password;
        console.log(requestUrl)
        return httpPost(requestUrl,param);
    }
}

export default request;
