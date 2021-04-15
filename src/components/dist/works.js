"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var react_1 = require("react");
require("../sass/Works.sass");
var works = /** @class */ (function (_super) {
    __extends(works, _super);
    function works(props) {
        var _this = _super.call(this, props) || this;
        _this.windows = props.windows;
        _this.windowHideFun = props.windowHide;
        return _this;
    }
    works.prototype.render = function () {
        var _this = this;
        return (react_1["default"].createElement("div", { id: "works" }, this.windows.map(function (v, index) {
            return (react_1["default"].createElement("div", { className: "work", onClick: function () {
                    _this.windowHideFun(index);
                } },
                react_1["default"].createElement("img", { src: v.icon })));
        })));
    };
    return works;
}(react_1["default"].Component));
exports["default"] = works;
