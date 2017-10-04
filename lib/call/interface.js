"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var call_1 = require("./call");
function createCall(target, display_name, logger) {
    if (!logger) {
        logger = new DummyLogger();
    }
    return new Promise(function (resolve, reject) {
        var api_url = 'https://api.starleaf.com/v1/webrtc/org_domain' +
            '?version=latest&target=' +
            encodeURIComponent(target);
        fetch(api_url, {
            method: 'GET'
        })
            .then(function (response) {
            if (response.ok) {
                return response.json();
            }
            else {
                throw 'Request failed';
            }
        })
            .then(function (json) {
            var cfg = {
                target: target,
                display_name: display_name,
                org_domain: json.org_domain
            };
            var call = call_1.Call(cfg, logger, false);
            resolve(call);
        })
            .catch(function (error) {
            reject(error);
        });
    });
}
exports.createCall = createCall;
var CallEndReason;
(function (CallEndReason) {
    CallEndReason[CallEndReason["USER_BYE"] = 0] = "USER_BYE";
    CallEndReason[CallEndReason["REMOTE_BYE"] = 1] = "REMOTE_BYE";
    CallEndReason[CallEndReason["BUSY"] = 2] = "BUSY";
    CallEndReason[CallEndReason["NOT_FOUND"] = 3] = "NOT_FOUND";
    CallEndReason[CallEndReason["REJECTED"] = 4] = "REJECTED";
    CallEndReason[CallEndReason["CONNECTION_ERROR"] = 5] = "CONNECTION_ERROR";
    CallEndReason[CallEndReason["CONNECTION_TIMEOUT"] = 6] = "CONNECTION_TIMEOUT";
    CallEndReason[CallEndReason["CONNECTION_REFUSED"] = 7] = "CONNECTION_REFUSED";
    CallEndReason[CallEndReason["ICE_FAILURE"] = 8] = "ICE_FAILURE";
    CallEndReason[CallEndReason["SIP_ERROR"] = 9] = "SIP_ERROR";
    CallEndReason[CallEndReason["INTERNAL_ERROR"] = 10] = "INTERNAL_ERROR";
    CallEndReason[CallEndReason["UNAVAILABLE"] = 11] = "UNAVAILABLE";
    CallEndReason[CallEndReason["PLUGIN_CRASH"] = 12] = "PLUGIN_CRASH";
})(CallEndReason = exports.CallEndReason || (exports.CallEndReason = {}));
var PCState;
(function (PCState) {
    PCState[PCState["SEND"] = 0] = "SEND";
    PCState[PCState["RECV"] = 1] = "RECV";
    PCState[PCState["DISABLED"] = 2] = "DISABLED";
})(PCState = exports.PCState || (exports.PCState = {}));
var DummyLogger = /** @class */ (function () {
    function DummyLogger() {
    }
    DummyLogger.prototype.debug = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
    };
    DummyLogger.prototype.info = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
    };
    DummyLogger.prototype.warn = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
    };
    DummyLogger.prototype.error = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
    };
    DummyLogger.prototype.sub = function (prefix) {
        return this;
    };
    return DummyLogger;
}());