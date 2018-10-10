import {
    isFunction,
    isBlankObject,
    isObject,
    isDate,
    isRegExp,
    isElement } from './getValueType.js';
import { hasOwnProperty } from './hasOwnProperty.js';

export const forEach = function(obj, callback, bindTo){
    var key, length;
    bindTo = bindTo || window;

    if(!obj) return;

    if(isFunction(obj)) {
        for(key in obj){
            if(key !== 'prototype' && key !== 'length' && key !== 'name' && hasOwnProperty(obj, key)) {
                callback.call(bindTo, obj[key], key, obj);
            }
        }
    }
    else if(obj.forEach) {
        obj.forEach(callback, bindTo, obj);
    }
    else if(isArray(obj) || isArrayLike(obj)) {
        length = obj.length;

        for(key=0; key<length; key++){
            if(hasOwnProperty(obj, key)) {
                callback.call(bindTo, obj[key], key, obj);
            }
        }
    }
    else {
        for(key in obj){
            if(hasOwnProperty(obj, key)) {
                callback.call(bindTo, obj[key], key, obj);
            }
        }
    }
}

export const forEachSorted = function(obj, callback, bindTo) {
    var keys = getKeys(obj).sort();

    forEach(obj, callback, bindTo);

    return keys;
}

export const getKeys = function(obj) {
    var keys = [];

    if(Object.keys){
        keys = Object.keys(obj);
    }
    else {
        for(var key in obj){
            keys.push(key);
        }
    }

    return keys;
}

export const every = function(obj, callback){
    var checked = false;
    var length = obj.length;

    if(obj.every){
        checked = obj.every(callback);
    }
    else if(isArray(obj)){
        for(var i=0;i<length;i++){
            checked = callback(obj[i], i, obj);
            if(!checked) return false;
        }
    }

    return checked;
}

export const extend = function(dst) {
    var args = [].slice.call(arguments, 1);

    return baseExtend(dst, args, false);
}

export const baseExtend = function(dst, objs, deep){
    var hash = dst.$$hashKey;
    var objLength = objs.length;

    for(var i=0; i<objLength; i++){
        var obj = objs[i];
        if(!isObject(obj) && !isFunction(obj)) continue;

        forEach(obj, function(value, key){
            if(deep && isObject(value)){
                if(isDate(value)){
                    dst[key] = new Date(value.valueOf());
                }
                else if(isRegExp(value)){
                    dst[key] = new RegExp(value);
                }
                else if(value.nodeName){
                    dst[key] = value.cloneNode(true);
                }
                else if(isElement(value)){
                    dst[key] = value.clone();
                }
                else {
                    if(!isObject(dst[key])) dst[key] = isArray(value) ? [] : {};
                    baseExtend(dst[key], [value], true);
                }
            }
            else {
                dst[key] = value;
            }

            setHashKey(dst, hash);

            return dst;
        });
    }
}

export const setHashKey = function(obj, hash) {
    if(hash)
        obj.$$hashKey = hash;
    else
        delete obj.$$hasKey;
}
