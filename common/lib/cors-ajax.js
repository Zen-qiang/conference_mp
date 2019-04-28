(function (root, factory) {
    'use strict';
    root.$cors = factory(root.jQuery);
}(this, function init($) {
    'use strict';

    //  Polyfills Object.keys, if necessary.
    //  @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys
    if (!Object.keys) {
        Object.keys = (function () {
            var hasOwnProperty = Object.prototype.hasOwnProperty,
                hasDontEnumBug = !({ toString: null }).propertyIsEnumerable('toString'),
                dontEnums = [
                    'toString',
                    'toLocaleString',
                    'valueOf',
                    'hasOwnProperty',
                    'isPrototypeOf',
                    'propertyIsEnumerable',
                    'constructor'
                ],
                dontEnumsLength = dontEnums.length;

            return function (obj) {
                if (typeof obj !== 'function' && (typeof obj !== 'object' || obj === null)) {
                    throw new TypeError('Object.keys called on non-object');
                }

                var result = [], prop, i;

                for (prop in obj) {
                    if (hasOwnProperty.call(obj, prop)) {
                        result.push(prop);
                    }
                }

                if (hasDontEnumBug) {
                    for (i = 0; i < dontEnumsLength; i++) {
                        if (hasOwnProperty.call(obj, dontEnums[i])) {
                            result.push(dontEnums[i]);
                        }
                    }
                }

                return result;
            };
        }());
    }

    var exports = {};
    var VERSION = '1.0.0';
    var baseUrl = 'http://localhost:8000/';
    exports.VERSION = VERSION;

    exports.init = function (_$) {
        return init(_$ || $);
    };

    /*exports.doGet = function (options, successFn, errorFn) {
        $.ajax({
            url: options.url,
            type: "GET",
            data: options.data,
            headers: options.headers,
            timeout: options.timeout,
            dataType: options.dataType,
            xhrFields: {
                withCredentials: true
            },
            crossDomain: true,
            success: successFn,
            error: errorFn
        });
    };

    exports.doPost = function (options, successFn, errorFn) {
        $.ajax({
            url: options.url,
            type: "POST",
            data: options.data,
            headers: options.headers,
            timeout: options.timeout,
            dataType: options.dataType,
            xhrFields: {
                withCredentials: true
            },
            crossDomain: true,
            success: successFn,
            error: errorFn
        });
    };*/

    exports.get = function (url, data, successFn, errorFn) {
        $.ajax({
            url: baseUrl + url,
            type: "GET",
            data: data,
            xhrFields: {
                withCredentials: true
            },
            crossDomain: true,
            success: successFn,
            error: errorFn
        });
    };

    exports.post = function (url, data, successFn, errorFn) {
        $.ajax({
            url: baseUrl + url,
            type: "POST",
            data: data,
            xhrFields: {
                withCredentials: true
            },
            crossDomain: true,
            success: successFn,
            error: errorFn
        });
    };

    return exports;
}));