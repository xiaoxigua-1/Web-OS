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
require("./sass/Main.sass");
var dock_1 = require("./components/dock");
var desktop_1 = require("./components/desktop");
var windows_1 = require("./components/windows");
var works_1 = require("./components/works");
var App = /** @class */ (function (_super) {
    __extends(App, _super);
    function App(props) {
        var _this = _super.call(this, props) || this;
        _this.windows = [];
        return _this;
        //this.ws = new MessageWS("ws://127.0.0.1:8000")
    }
    App.prototype.render = function () {
        return (react_1["default"].createElement("div", { className: "App" },
            react_1["default"].createElement("header", { className: "App-header" }),
            react_1["default"].createElement(works_1["default"], { windows: this.windows, windowHide: this.windowHide(), windowDelete: this.deleteWindow() }),
            react_1["default"].createElement(desktop_1["default"], { windowsAdd: this.addWindow() }),
            react_1["default"].createElement(windows_1["default"], { windows: this.windows, windowHide: this.windowHide(), windowDelete: this.deleteWindow() }),
            react_1["default"].createElement(dock_1["default"], { windowsAdd: this.addWindow() })));
    };
    App.prototype.addWindow = function () {
        var _this = this;
        return function (title, icon, app) {
            _this.windows.push({
                title: title,
                icon: icon,
                width: 800,
                height: 600,
                left: document.body.clientWidth / 2 - 400 + _this.windows.length * 20,
                top: document.body.clientHeight / 2 - 300 + _this.windows.length * 20,
                style: { opacity: 1 },
                outsudeFrameStyle: "auto",
                app: app
            });
            _this.setState({ windows: _this.windows });
        };
    };
    App.prototype.deleteWindow = function () {
        var _this = this;
        return function (index) {
            _this.windows.splice(index, 1);
            _this.setState({ windows: _this.windows });
        };
    };
    App.prototype.windowHide = function () {
        var _this = this;
        return function (index) {
            if (_this.windows[index].style.opacity) {
                _this.windows[index].style = {
                    opacity: 0,
                    pointerEvents: "none"
                };
            }
            else {
                _this.windows[index].style = {
                    opacity: 1,
                    pointerEvents: "auto"
                };
            }
            _this.setState({ windows: _this.windows });
        };
    };
    return App;
}(react_1["default"].Component));
;
exports["default"] = App;
