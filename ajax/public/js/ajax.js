/**
 *
 * data 구조는
 *
 * 단일일때는
 * {
 *  data-value: '',
 *  data-type: ''
 * }
 *
 * 복수 데이터일 때는
 * {
 *  name: value,
 *  ...
 * }
 */

var ajax = {

    ajax : function (method, url, datas, callback) {

        var dataType;
        var DATA = null;

        method = method.toUpperCase();

        if (method === 'GET' && typeof datas === 'string') {
            url += '?' + datas;
        }

        var xhr = new XMLHttpRequest();
        xhr.open(method, url);

        xhr.onreadystatechange = function () {

            if (xhr.readyState === 4 && xhr.status === 200) {
                var type = xhr.getResponseHeader('Content-type');

                if (type && type.indexOf('xml') !== -1) {
                    callback(xhr.responseXML);
                } else if (type && type.indexOf('application/json') !== -1) {
                    callback(JSON.parse(xhr.responseText));
                } else {
                    callback(xhr.responseText);
                }
            }

        };

        if (method === 'POST' && datas) {
            if (datas.hasOwnProperty('data-value')) {
                DATA = datas['data-value'];
                dataType = datas['data-type'] || 'text/plain';
                xhr.setRequestHeader('Content-type', dataType);
            } else {
                var formData = new FormData();
                for (var name in datas) {
                    if (!datas.hasOwnProperty(name)) continue;
                    formData.append(name, datas[name]);
                }
                DATA = formData;
            }
        }

        xhr.send(DATA);

    }

};

ajax.get = ajax.ajax.bind(null, 'GET');
ajax.post = ajax.ajax.bind(null, 'POST');

function logResponseData(data) {
    console.log('type: ' + typeof data);
    console.dir(data);
}