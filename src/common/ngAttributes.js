export const ngAttrPrefixes = ['ng-', 'data-ng-', 'ng:', 'x-ng-'];

export const getNgAttribute = function(element, ngAttr) {
    var attr, index, length = ngAttrPrefixes.length;

    for(index = 0; index<length; i++){
        attr = element.getAttribute(ngAttrPrefixes[index] + ngAttr);
        if(isString(attr)) {
            return attr;
        }
    }

    return null;
};
