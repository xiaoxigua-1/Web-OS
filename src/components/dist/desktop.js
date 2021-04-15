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
require("../sass/Desktop.sass");
var control_center_png_1 = require("../icons/PNGS/control-center.png");
var Desktop = /** @class */ (function (_super) {
    __extends(Desktop, _super);
    function Desktop(props) {
        var _this = _super.call(this, props) || this;
        _this.windowsAddFun = props.windowsAdd;
        _this.x = 0;
        _this.y = 0;
        _this.width = 0;
        _this.height = 0;
        _this.opacity = 0;
        _this.style = { opacity: 0 };
        _this.icons = [
            { icon: control_center_png_1["default"], name: "ww", app: "ww", top: 0, left: 0, circle: false },
            { icon: control_center_png_1["default"], name: "ww", app: "ww", top: 0, left: 0, circle: false },
            { icon: control_center_png_1["default"], name: "ww", app: "ww", top: 0, left: 0, circle: false },
            { icon: control_center_png_1["default"], name: "ww", app: "ww", top: 0, left: 0, circle: false },
            { icon: control_center_png_1["default"], name: "ww", app: "ww", top: 0, left: 0, circle: false },
            { icon: control_center_png_1["default"], name: "ww", app: "ww", top: 0, left: 0, circle: false },
            { icon: control_center_png_1["default"], name: "ww", app: "ww", top: 0, left: 0, circle: false },
            { icon: control_center_png_1["default"], name: "ww", app: "ww", top: 0, left: 0, circle: false },
            { icon: control_center_png_1["default"], name: "ww", app: "ww", top: 0, left: 0, circle: false },
            { icon: control_center_png_1["default"], name: "ww", app: "ww", top: 0, left: 0, circle: false },
            { icon: control_center_png_1["default"], name: "ww", app: "ww", top: 0, left: 0, circle: false }
        ];
        _this.indexX = 0;
        _this.indexY = 0;
        _this.iconXY()();
        window.onresize = _this.iconXY();
        _this.setState({ style: _this.style });
        return _this;
    }
    Desktop.prototype.render = function () {
        var _this = this;
        return (react_1["default"].createElement("div", { id: "desktop", onMouseDown: function (e) {
                _this.xyInit(e);
            }, onMouseUp: function () {
                _this.clearXY();
            }, onMouseMove: function (e) {
                _this.updateXY(e);
            }, onClick: function () {
                _this.iconCircle(0, 0);
            } },
            react_1["default"].createElement("div", { id: "icons" }, this.icons.map(function (v, index) {
                return (react_1["default"].createElement("div", { className: "desktop-icon", title: v.name, key: index.toString(), tabIndex: index, style: {
                        top: v.top,
                        left: v.left,
                        backgroundColor: v.circle ? "rgba(255, 255, 255, 0.3)" : ""
                    }, onDoubleClick: function () {
                        _this.windowsAddFun(v.name, v.icon, v.app);
                    } },
                    react_1["default"].createElement("img", { src: v.icon }),
                    react_1["default"].createElement("div", { className: "desktop-name" }, v.name)));
            })),
            react_1["default"].createElement("div", { id: "circle", style: this.style })));
    };
    Desktop.prototype.xyInit = function (event) {
        this.x = event.clientX;
        this.y = event.clientY;
        this.opacity = 1;
    };
    Desktop.prototype.clearXY = function () {
        this.opacity = 0;
        this.width = 0;
        this.height = 0;
        this.x = 0;
        this.y = 0;
        this.style = {
            opacity: this.opacity
        };
        this.setState({ style: this.style });
    };
    Desktop.prototype.updateXY = function (event) {
        if (!this.opacity)
            return;
        this.width = Math.abs(event.clientX - this.x);
        this.height = Math.abs(event.clientY - this.y);
        var top, left;
        if (this.x > event.clientX) {
            left = this.x - this.width;
        }
        else {
            left = this.x;
        }
        if (this.y > event.clientY) {
            top = this.y - this.height;
        }
        else {
            top = this.y;
        }
        this.style = {
            opacity: this.opacity,
            width: this.width,
            height: this.height,
            top: top,
            left: left
        };
        this.iconCircle(left, top);
        this.setState({ style: this.style });
    };
    Desktop.prototype.iconXY = function () {
        var _this = this;
        return function () {
            _this.indexX = 0;
            _this.indexY = 0;
            _this.icons.map(function (v, index) {
                if (document.body.clientHeight < _this.indexY + 300) {
                    _this.indexY = 0;
                    _this.indexX += 136;
                }
                else if (index !== 0) {
                    _this.indexY += 115;
                }
                v.top = _this.indexY;
                v.left = _this.indexX;
                return v;
            });
            _this.setState({ icons: _this.icons });
        };
    };
    Desktop.prototype.iconCircle = function (left, top) {
        var _this = this;
        this.icons.map(function (v, index) {
            if (left < v.left + 70 + 136 &&
                left + _this.width > v.left + 70 &&
                top < v.top + 70 + 115 &&
                top + _this.height > v.top + 70) {
                v.circle = true;
            }
            else {
                v.circle = false;
            }
        });
    };
    return Desktop;
}(react_1["default"].Component));
exports["default"] = Desktop;
