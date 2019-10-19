import ajax from 'axios'

function get(url,param) {
    return new Promise((resolve, reject) => {
        ajax.get(url, {
            params:param
        })
            .then(function (response) {
                resolve(response)
            })
            .catch(function (error) {
                reject(error)
            });
    })
}

export  {get}
