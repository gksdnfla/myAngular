import { isObject } from '../common/getValueType.js';
import { extend } from '../common/forEach.js';

export const bootstrap = function(element, modules, config){
    if(!isObject(config)) config = {};
    var defaultConfig = {
        strictDi = false
    };

    config = extend(defaultConfig, config);

    var doBootstrap = function() {
        element = jqLite(element);

        if (element.injector()) {
            var tag = (element[0] === window.document) ? 'document' : startingTag(element);

            throw ngMinErr(
                'btstrpd',
                'App already bootstrapped with this element \'{0}\'',
                tag.replace(/</, '&lt;').replace(/>/,'&gt;');
            );
        }

        modules = modules || [];
        modules.unshift(['$provide', function($provide){
            $provide.value('$rootElement', element);
        }]);

        if (config.debugInfoEnabled) {
            modules.push(['$compileProvider', function($compileProvider) {
                $compileProvider.deugInfoEnabled(true);
            }]);
        }

        modules.unshift('ng');
        var injector = createInjector(modules, config.strictDi);
        injector.invoke([
            '$rootScope',
            '$rootElement',
            '$compile',
            '$injector',
            function($rootScope, $rootElement, $compile, $injector) {
                $rootScope.$apply(function(){
                    element.data('$injector', $injector);
                    compile(element)($rootScope);
                })
            }
        ]);

        return injector;
    };

    var NG_ENABLE_DEBUG_INFO = /^NG_ENABLE_DEBUG_INFO!/;
    var NG_DEFER_BOOTSTRAP = /^NG_DEFER_BOOTSTRAP!/;

    if(window && NG_ENABLE_DEBUG_INFO.test(window.name)) {
        config.debugInfoEnabled = true;
        window.name = window.namereplace(NG_ENABLE_DEBUG_INFO, '');
    }

    if(window && !NG_DEFER_BOOTSTRAP.test(window.name)) {
        return doBootstrap();
    }

    window.name = window.name.replace(NG_DEFER_BOOTSTRAP, '');
    window.angular.resumeBootstrap = function(extraModules) {
        forEach(extraModules, function(extraModule){
            modules.push(extraModule);
        });

        return doBootstrap();
    }

    if(isFunction(window.angular.resumeDeferredBootstrap)) {
        window.angular.resumeDeferredBootstrap();
    }
}
