export default function(elements){
    if(!elements) return;

    if(elements.nodeType) {
        this[this.length++] = elements;
    }
    else {
        var length = elements.length;

        if(typeof length === 'number' && elements.window !== elements) {
            if(length){
                for(var i=0; i<length; i++){
                    this[this.length++] = elements[i];
                }
            }
        }
        else {
            this[this.length++] = elements;
        }
    }
}
