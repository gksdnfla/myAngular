export function hasOwnProperty(obj, key){
    return obj.hasOwnProperty ? obj.hasOwnProperty(key) : key in obj;
}
