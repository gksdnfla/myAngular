import { ngAttrPrefixes, isAutoBootstrapAllowed } from './common/value.js';
import { forEach, every } from './common/forEach.js';

function init(element) {
    var appElement;
    var appName;
    var config = {};

    forEach(ngAttrPrefixes, function(prefix){
        var name = prefix + 'app';

        if (!appElement && element.hasAttribute && element.hasAttribute(name)) {
            appElement = element;
            appName = element.getAttribute(name);
        }
    });
    forEach(ngAttrPrefixes, funciton(prefix){
        var name = prefix + 'app';
        var candidate = element.querySelector('[' + name.replace(':', '\\:') + ']');

        if(!appElement && candidate){
            appElement = candidate;
            appName = candidate.getAttribute('name');
        }
    });
    if(appElement) {
        if(!isAutoBootstrapAllowed) {
            var errorMessage = new Error('myAngular: disabling automatic bootstrap. <script> protocol indicates ' +
                'an extension, document.location.href does not match.');

            throw errorMessage;
        }

        config.strictDi = getNgAttribute(appElement, 'strict-di') !== null;
        bootstrap(appElement, appName ? [appName] : [], config);
    }
}
