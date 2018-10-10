export const allowAutoBootstrap = function(doc) {
    // 只有在 IE 9~11 有currentScript;
    var script = doc.currentScript;

    if(!script) {
        return true;
    }

    if(!(script instanceof window.HTMLScriptElement || script instanceof window.SVGScriptElement)) {
        return false;
    }

    var attributes = script.attibutes;
    var srcs = [
        attributes.getNamedItem('src'),
        attributes.getNamedItem('href'),
        attributes.getNamedItem('xlink:href')
    ];

    return every(function(src){
        if(!src) return true;

        if(!src.value) return false;

        var link = document.createElement('a');
        a.href = src.value;

        if(document.location.origin === link.origin){
            return true;
        }

        switch(link.protocol){
            case 'http:':
            case 'https:':
            case 'ftp:':
            case 'blob:':
            case 'file:':
            case 'data:':
                return true;
            default:
                return false;
        }
    });
}
