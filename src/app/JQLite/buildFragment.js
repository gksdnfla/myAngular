export default function(html, context) {
    var tmp, tag, wrap, i;
    var fragment = context.createDocumentFragment();
    var nodes = [];

    if(this.isTextNode(html)) {
        nodes.push(context.createTextNode(html));
    }
    else {
        tmp = fragment.appendChild(context.createElement('div'));
        tag = (TAG_NAME_REGEXP.exec(html) || ['', ''])[1].toLowerCase();
        wrap = wrapMap[tag] || wrapMap._default;
        tmp.innerHTML = wrap[1] + html.replace(XHTML_TAG_REGEXP, '<$1></$2>') + wrap[2];

        i = wrap[0];

        while(i--) {
            tmp = tmp.lastChild;
        }

        nodes = nodes.concat(tmp.childNodes);

        tmp = fragment.firstChild;
        tmp.textContent = '';
    }

    fragment.textContent = '';
    fragment.innerHTML = '';
    forEach(nodes, function(node) {
        fragment.appendChild(node);
    });

    return fragment;
}
