export function httpGet(url) {
    return fetch(url);
}

export function paramGet(url,param) {
    return fetch(url+'?'+objToString(param),{
        method:'GET'
    })
}

export function httpPost(url,param) {
    return fetch(url,{
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        body: JSON.stringify(param), // must match 'Content-Type' header
        // cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        // credentials: 'same-origin', // include, same-origin, *omit
        headers: {
            'user-agent': 'Mozilla/4.0 MDN Example',
            // 'content-type': 'application/x-www-form-urlencoded'
            'content-Type': 'application/json'
        },
        // mode: 'cors', // no-cors, cors, *same-origin
        // redirect: 'follow', // manual, *follow, error
        // referrer: 'no-referrer', // *client, no-referrer
    })

}

function objToString(obj) {
    var arr=[];
    var index=0;
    for(let item in obj){
        arr[index++]=[item,obj[item]]
    }
    return new URLSearchParams(arr).toString();
}
