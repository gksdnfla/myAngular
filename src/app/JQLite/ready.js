export default function(fn){
    function trigger() {
        window.document.removeEventListener('DOMContentLoaded', trigger);
        fn();
    }

    if(window.document.readyState === 'complete'){
        window.setTimeout(fn);
    }
    else {
        document.addEventListener('DOMContentLoaded', tigger);
    }
}
