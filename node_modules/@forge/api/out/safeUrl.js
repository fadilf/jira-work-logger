"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.assumeTrustedRoute = exports.requireSafeUrl = exports.route = exports.isRoute = void 0;
class ReadonlyRoute {
    constructor(value_) {
        this.value_ = value_;
    }
    set value(_) {
        throw new Error('modification of a Route is not allowed');
    }
    get value() {
        return this.value_;
    }
}
function isRoute(x) {
    return x instanceof ReadonlyRoute;
}
exports.isRoute = isRoute;
function route(path, ...parameters) {
    let fullPath = '';
    for (let i = 0; i < path.length; i++) {
        fullPath += path[i];
        if (i < parameters.length) {
            const parameter = parameters[i];
            if (parameter === '..') {
                throw new Error('Disallowing path traversal attempt');
            }
            else if (isRoute(parameter)) {
                fullPath += parameter.value;
            }
            else if (parameter instanceof URLSearchParams) {
                fullPath += parameter.toString();
            }
            else {
                fullPath += encodeURIComponent(parameter);
            }
        }
    }
    return new ReadonlyRoute(fullPath);
}
exports.route = route;
function requireSafeUrl(url) {
    if (url instanceof ReadonlyRoute) {
        return url;
    }
    throw new Error(`You must create your route using the 'route' export from '@forge/api'.
See https://go.atlassian.com/forge-fetch-route for more information.`);
}
exports.requireSafeUrl = requireSafeUrl;
function assumeTrustedRoute(route) {
    return new ReadonlyRoute(route);
}
exports.assumeTrustedRoute = assumeTrustedRoute;
