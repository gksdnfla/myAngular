import { isString, isFunction, isElement } from '../../common/getValueType.js';

export default function(element) {
    if(element instanceof JQLite){
        return element;
    }

    var argIsString = false;

    if(isString(element)){
        element = element.trim();
        argIsString = true;
    }
    if(!(this instanceof JQLite)) {
        if(argIsString && element.charAt(0) !== '<'){
            throw jqLiteMinErr('nosel', 'Looking up elements via selectors is not supported by jqLite! See: http://docs.angularjs.org/api/angular.element');
        }
    }
    if(argIsString) {
        this.addNodes(this, this.parseHtml(element));
    }
    else if(isFunction(element)){
        this.ready(element);
    }
    else if(isElement(element)){
        this.addNodes(this, element);
    }
    else {
        throw new Error('');
    }
}
