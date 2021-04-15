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
require("../sass/Dock.sass");
var control_center_png_1 = require("../icons/PNGS/control-center.png");
var folder_png_1 = require("../icons/PNGS/folder.png");
var setting_1 = require("./App/setting");
var Dock = /** @class */ (function (_super) {
    __extends(Dock, _super);
    function Dock(props) {
        var _this = _super.call(this, props) || this;
        //axios get user dock setting
        _this.appList = [
            { icon: control_center_png_1["default"], appName: "dsa", height: "50px", app: react_1["default"].createElement(setting_1["default"], null) },
            { icon: folder_png_1["default"], appName: "sad", height: "50px", app: "w" },
            { icon: control_center_png_1["default"], appName: "sad", height: "50px", app: "d" },
            { icon: control_center_png_1["default"], appName: "sdsad", height: "50px", app: "c" }
        ];
        return _this;
    }
    Dock.prototype.render = function () {
        var _this = this;
        return (react_1["default"].createElement("div", { id: "Dock" },
            react_1["default"].createElement("div", { className: "apps" }, this.appList.map(function (v, index) {
                return (react_1["default"].createElement("div", { className: "app", key: index.toString(), style: { height: v.height }, onMouseOver: function () {
                        _this.iconHeight(index);
                    }, onMouseOut: function () {
                        _this.iconHeightInit(index);
                    }, onClick: function () {
                        _this.props.windowsAdd(v.appName, v.icon, v.app);
                        _this.appIconClick(index);
                    } },
                    react_1["default"].createElement("img", { title: v.appName, src: v.icon })));
            }))));
    };
    Dock.prototype.iconHeight = function (index) {
        if (index !== 0) {
            this.appList[index - 1].height = "65px";
        }
        if (index !== this.appList.length - 1) {
            this.appList[index + 1].height = "65px";
        }
        this.appList[index].height = "80px";
        this.setState({ appList: this.appList });
    };
    Dock.prototype.iconHeightInit = function (index) {
        if (index !== 0) {
            this.appList[index - 1].height = "50px";
        }
        if (index !== this.appList.length - 1) {
            this.appList[index + 1].height = "50px";
        }
        this.appList[index].height = "50px";
        this.setState({ appList: this.appList });
    };
    Dock.prototype.appIconClick = function (index) {
    };
    return Dock;
}(react_1["default"].Component));
exports["default"] = Dock;
