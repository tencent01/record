
export function httpGet(url) {
    let header=new Headers();
    header.append('content-Type','application/json');
    header.append('Authorization','BearereyJhbGciOiJIUzI1NiJ9.eyJ1c2VyTmFtZSI6ImFkbWluIiwiZXhwIjoxNTkyODk4NjkzLCJpYXQiOjE1OTI4MTIyOTN9.bHMqEPAK4kwfH-E3DUgeVeccakBti4ilHU34xBPVAu8');

    return fetch(url,{
        method:'GET',
        headers:header
    });
}

export function paramGet(url,param) {
    return fetch(url+'?'+objToString(param),{
        method:'GET',
        headers:{
            "x-csrf-token": 'BearereyJhbGciOiJIUzI1NiJ9.eyJ1c2VyTmFtZSI6ImFkbWluIiwiZXhwIjoxNTkyODk4NjkzLCJpYXQiOjE1OTI4MTIyOTN9.bHMqEPAK4kwfH-E3DUgeVeccakBti4ilHU34xBPVAu8',
            'Authorization':'BearereyJhbGciOiJIUzI1NiJ9.eyJ1c2VyTmFtZSI6ImFkbWluIiwiZXhwIjoxNTkyODk4NjkzLCJpYXQiOjE1OTI4MTIyOTN9.bHMqEPAK4kwfH-E3DUgeVeccakBti4ilHU34xBPVAu8'
        }
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
            'content-Type': 'application/json',
            'Authorization':'BearereyJhbGciOiJIUzI1NiJ9.eyJ1c2VyTmFtZSI6ImFkbWluIiwiZXhwIjoxNTkyODk4NjkzLCJpYXQiOjE1OTI4MTIyOTN9.bHMqEPAK4kwfH-E3DUgeVeccakBti4ilHU34xBPVAu8'
        },
        // mode: 'cors', // no-cors, cors, *same-origin
        // redirect: 'follow', // manual, *follow, error
        // referrer: 'no-referrer', // *client, no-referrer
    })
}

export function httpFormPost(url,param) {
    return fetch(url,{
        method: 'post',
        body:param,
        headers:{
            'Authorization':'BearereyJhbGciOiJIUzI1NiJ9.eyJ1c2VyTmFtZSI6ImFkbWluIiwiZXhwIjoxNTkyODk4NjkzLCJpYXQiOjE1OTI4MTIyOTN9.bHMqEPAK4kwfH-E3DUgeVeccakBti4ilHU34xBPVAu8'
        },
        contextType:false,
    })
}

export function httpTokenPost(url,param,token) {
    return fetch(url,{
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        body: JSON.stringify(param), // must match 'Content-Type' header
        // cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        // credentials: 'same-origin', // include, same-origin, *omit
        headers: {
            'user-agent': 'Mozilla/4.0 MDN Example',
            // 'content-type': 'application/x-www-form-urlencoded'
            'content-Type': 'application/json',
            "x-csrf-token": token,
            'Authorization':'BearereyJhbGciOiJIUzI1NiJ9.eyJ1c2VyTmFtZSI6ImFkbWluIiwiZXhwIjoxNTkyODk4NjkzLCJpYXQiOjE1OTI4MTIyOTN9.bHMqEPAK4kwfH-E3DUgeVeccakBti4ilHU34xBPVAu8'
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
