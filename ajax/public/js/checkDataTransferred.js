ajax.get('/checkGet/form', 'param1=hello&param2=good', logResponseData);

ajax.post('/check/form', {
    test1: 'test1',
    test2: 'test2'
}, logResponseData);