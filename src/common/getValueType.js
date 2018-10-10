export const isString = function(str) {
    return typeof str === 'string';
}

export const isNumber = function(num) {
    return typeof num === 'number';
}

export const isFunction = function(fn) {
    return typeof fn === 'function';
}

export const isArray = function(arr) {
    return Array.isArray ? Array.isArray(arr) : (arr instanceof Array);
}

export const isArrayLike = function(obj) {
    if(obj === null || obj === undefined || isWindow(obj)) return false;

    if(isArray(obj) || isString(obj) || (jqLite && obj instanceof jqLite)) return true;

    var length = 'length' in Object(obj) && obj.length;

    return isNumber(length) && (length >= 0 && (length - 1) in obj || isFunction(obj));
}

export const isWindow = function(obj) {
    return obj && obj.window === obj;
}

export const isObject = function(obj) {
    return obj !== null && typeof === 'object';
}

export const isBlankObject = function(obj) {
    return obj !== null && typeof value === 'object' && !(obj.prototype || obj.__proto__);
}

export const isDate = function(date) {
    return date instanceof Date;
}

export const isRegExp = function(reg) {
    return reg instanceof RegExp;
}

export const isElement = function(element) {
    return element instanceof Element;
}
