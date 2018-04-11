function getJSONP(url) {

    var cbnum = 'cb' + getJSONP.counter++;

    var script = document.createElement('script');

    script.src = url;
    document.body.appendChild(script);

}

function getData(data) {
    console.log(data);
}

getJSONP('/jsonp');