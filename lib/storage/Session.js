"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var aaa = /** @class */ (function () {
    function aaa() {
        this.config = "a";
    }
    aaa.prototype.init = function () {
        this.config = 'b';
    };
    return aaa;
}());
exports.default = aaa;
