import { SINGLE_TAG_REGEXP } from './regexp.js';

export default function(html, context){
    context = context || window.document;

    var parsed;

    if((parsed = SINGLE_TAG_REGEXP.exec(html))) {
        return [content.createElement(parsed[1])];
    }

    if((parsed = this.buildFragment(html, context))){
        return parsed.childNodes;
    }

    return [];
}
