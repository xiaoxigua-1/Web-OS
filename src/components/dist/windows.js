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
require("../sass/Windows.sass");
var Windows = /** @class */ (function (_super) {
    __extends(Windows, _super);
    function Windows(props) {
        var _this = _super.call(this, props) || this;
        _this.windowHideFun = props.windowHide;
        _this.windowDeleteFun = props.windowDelete;
        _this.windows = props.windows;
        _this.windowsZIndex = props.windowsZIndex;
        _this.windowMobileSwitch = false;
        _this.windowFocus = null;
        _this.windowsStyle = {};
        _this.windowSizePosition = null;
        _this.widnowSizeSwitch = false;
        _this.windowSizeFocus = null;
        _this.windowMobileXY = [];
        return _this;
    }
    Windows.prototype.render = function () {
        var _this = this;
        return (react_1["default"].createElement("div", { id: "windows", onMouseMove: function (e) {
                if (_this.windowFocus !== null)
                    _this.windowMobile(e, _this.windowFocus);
                if (_this.windowSizePosition !== null && _this.windowSizeFocus !== null && _this.widnowSizeSwitch)
                    _this.windowSize(e, _this.windowSizeFocus);
            }, onMouseUp: function () {
                _this.windowSizePosition = null;
                _this.widnowSizeSwitch = false;
                _this.windowsStyle = {
                    pointerEvents: "none"
                };
                _this.setState({ windowsStyle: _this.windowsStyle });
            }, style: this.windowsStyle }, this.windows.map(function (v, index) {
            var appContent = v.app;
            return (react_1["default"].createElement("div", { key: index.toString() },
                react_1["default"].createElement("div", { className: "window-fit", style: _this.windowFit(index) }),
                react_1["default"].createElement("div", { className: "window-outside-frame", style: {
                        height: v.height + 8,
                        width: v.width + 8,
                        left: v.left - 4,
                        top: v.top - 4,
                        cursor: v.outsudeFrameStyle,
                        pointerEvents: v.style.pointerEvents,
                        zIndex: (_this.windowsZIndex.indexOf(index) + 1) * 2 - 1
                    }, onMouseDown: function (e) {
                        _this.widnowSizeSwitch = true;
                        _this.windowsStyle = {
                            pointerEvents: "auto"
                        };
                        _this.setState({ windowsStyle: _this.windowsStyle });
                    }, onMouseMove: function (e) {
                        var windowData = _this.windows[index];
                        if (_this.widnowSizeSwitch)
                            return;
                        _this.windowSizeFocus = index;
                        if (e.clientX <= windowData.left) { // left
                            v.outsudeFrameStyle = "col-resize";
                            _this.windowSizePosition = 1;
                        }
                        else if (e.clientX >= windowData.left + windowData.width) { // right
                            v.outsudeFrameStyle = "col-resize";
                            _this.windowSizePosition = 2;
                        }
                        else if (e.clientY <= windowData.top) { // top
                            v.outsudeFrameStyle = "row-resize";
                            _this.windowSizePosition = 3;
                        }
                        else if (e.clientY >= windowData.top + windowData.height) { // bottom
                            v.outsudeFrameStyle = "row-resize";
                            _this.windowSizePosition = 4;
                        }
                        _this.setWindow();
                    }, onMouseOut: function () {
                        if (!_this.widnowSizeSwitch) {
                            v.outsudeFrameStyle = "auto";
                            _this.setWindow();
                        }
                    } }),
                react_1["default"].createElement("div", { className: "window", style: {
                        height: v.height,
                        width: v.width,
                        left: v.left,
                        top: v.top,
                        opacity: v.style.opacity,
                        pointerEvents: v.style.pointerEvents,
                        zIndex: (_this.windowsZIndex.indexOf(index) + 1) * 2
                    }, onMouseDown: function () {
                        _this.windowsFocus(index);
                    } },
                    react_1["default"].createElement("div", { className: "window-header", onMouseDown: function (e) {
                            // this.windowsFocus(index);
                            _this.windowMobileSwitch = true;
                            _this.windowFocus = index;
                            _this.windowMobileXY = [
                                e.clientX - _this.windows[index].left,
                                e.clientY - _this.windows[index].top
                            ];
                            _this.windowsStyle = {
                                pointerEvents: "auto"
                            };
                            _this.setState({ windowsStyle: _this.windowsStyle });
                        }, onMouseUp: function () {
                            _this.windowMobileSwitch = false;
                            _this.windowFocus = null;
                            _this.windowsStyle = {
                                pointerEvents: "none"
                            };
                            _this.setState({ windowsStyle: _this.windowsStyle });
                        } },
                        react_1["default"].createElement("img", { className: "window-icon", src: v.icon }),
                        react_1["default"].createElement("div", { className: "window-title" }, v.title),
                        react_1["default"].createElement("span", { className: "window-tool" },
                            react_1["default"].createElement("div", { className: "window--", onClick: function () {
                                    _this.windowHideFun(index);
                                } }),
                            react_1["default"].createElement("div", { className: "window-o" }),
                            react_1["default"].createElement("div", { className: "window-x", onMouseUp: function (e) {
                                    _this.windowDeleteFun(index);
                                } }))),
                    react_1["default"].createElement("div", { className: "window-content" }, appContent))));
        })));
    };
    Windows.prototype.windowMobile = function (event, index) {
        if (this.windowMobileSwitch) {
            if (70 - this.windows[index].width < event.clientX - this.windowMobileXY[0] &&
                document.body.clientWidth - 70 > event.clientX - this.windowMobileXY[0]) {
                this.windows[index].left = event.clientX - this.windowMobileXY[0];
            }
            if (event.clientY - this.windowMobileXY[1] >= 48)
                this.windows[index].top = event.clientY - this.windowMobileXY[1];
            // Hmmmm
            var windowData = this.windows[index];
            if (windowData.top <= 50) {
                console.log("top");
                this.windows[index].fit = "top";
            }
            else if (windowData.left <= 0) {
                console.log("left");
                this.windows[index].fit = "left";
            }
            else if (windowData.left + windowData.width > document.body.clientWidth) {
                console.log("right");
                this.windows[index].fit = "right";
            }
            else {
                this.windows[index].fit = "none";
            }
            this.setWindow();
        }
    };
    Windows.prototype.windowsFocus = function (index) {
        var windowIndex = this.windowsZIndex.indexOf(index);
        this.windowsZIndex.splice(windowIndex, 1);
        this.windowsZIndex.push(index);
        this.setWindow();
    };
    Windows.prototype.windowSize = function (event, index) {
        if (this.windowSizePosition === 4) { // bottom
            var changeY = event.clientY - this.windows[index].top;
            if (changeY > 300)
                this.windows[index].height = changeY;
        }
        else if (this.windowSizePosition === 3) { // top
            var changeY = this.windows[index].top + this.windows[index].height - event.clientY;
            console.log(changeY);
            if (changeY > 300) {
                this.windows[index].top = event.clientY + 2;
                this.windows[index].height = changeY - 2;
            }
        }
        else if (this.windowSizePosition === 2) { // right
            var changeX = event.clientX - this.windows[index].left - 2;
            if (changeX > 300)
                this.windows[index].width = changeX;
        }
        else if (this.windowSizePosition === 1) { // left
            var changeX = this.windows[index].left + this.windows[index].width - event.clientX - 2;
            if (changeX > 300) {
                this.windows[index].left = event.clientX + 2;
                this.windows[index].width = changeX;
            }
        }
        this.setWindow();
    };
    Windows.prototype.windowFit = function (index) {
        var windowData = this.windows[index];
        if (windowData.fit === "none")
            return ({
                width: windowData.width,
                height: windowData.height,
                top: windowData.top,
                left: windowData.left
            });
        else if (windowData.fit === "top")
            return ({
                width: document.body.clientWidth,
                height: document.body.clientHeight - 50,
                top: 50,
                left: 0,
                backgroundColor: "#ffff"
            });
        else if (windowData.fit === "left")
            return ({
                width: document.body.clientWidth / 2,
                height: document.body.clientHeight - 50,
                top: 50,
                left: 0,
                backgroundColor: "#ffff"
            });
        else if (windowData.fit === "right")
            return ({
                width: document.body.clientWidth / 2,
                height: document.body.clientHeight - 50,
                top: 50,
                left: document.body.clientWidth / 2,
                backgroundColor: "#ffff"
            });
        return {};
    };
    // private setWindowSetting(index: number) {
    //     return (
    //         title: string | undefined,
    //         width: number | undefined,
    //         height: number | undefined,
    //         top: number | undefined,
    //         left: number | undefined,
    //         icon: string | undefined,
    //     ) => {
    //         const windowSetting = this.windows[index];
    //         this.windows[index] = {
    //             title: title === undefined ? windowSetting.title : title,
    //             width: width === undefined ? windowSetting.width : width,
    //             height: height === undefined ? windowSetting.height : height,
    //             top: top === undefined ? windowSetting.top : top,
    //             left: left === undefined ? windowSetting.left : left,
    //             icon: icon === undefined ? windowSetting.icon : icon,
    //             style: windowSetting.style,
    //             app: windowSetting.app,
    //             outsudeFrameStyle: windowSetting.outsudeFrameStyle
    //         }
    //         this.setWindow();
    //     }
    // }
    Windows.prototype.setWindow = function () {
        this.setState({ windows: this.windows, windowsZIndex: this.windowsZIndex });
    };
    return Windows;
}(react_1["default"].Component));
exports["default"] = Windows;
