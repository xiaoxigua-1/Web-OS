import React from 'react';
import "../sass/Windows.sass";
import { windows, window } from "../type/window";

export default class Windows extends React.Component<windows, {}> {

    private windows: Array<window>;
    private windowMobileSwitch: boolean;
    private windowFocus: number | null;
    private windowsStyle: React.CSSProperties;
    private windowSizePosition: number | null;
    private widnowSizeSwitch: boolean;
    private windowSizeFocus: number | null;
    private windowMobileXY: Array<number>;
    private windowHideFun: (index: number) => void;
    private windowDeleteFun: (index: number) => void;

    constructor(props: windows) {
        super(props);
        this.windowHideFun = props.windowHide;
        this.windowDeleteFun = props.windowDelete;
        this.windows = props.windows;
        this.windowMobileSwitch = false;
        this.windowFocus = null;
        this.windowsStyle = {};
        this.windowSizePosition = null;
        this.widnowSizeSwitch = false;
        this.windowSizeFocus = null;
        this.windowMobileXY = [];
    }

    render() {
        return (
            <div id="windows"
                onMouseMove={
                    (e) => {
                        if (this.windowFocus !== null)
                            this.windowMobile(e, this.windowFocus);
                        if (this.windowSizePosition !== null && this.windowSizeFocus !== null && this.widnowSizeSwitch)
                            this.windowSize(e, this.windowSizeFocus);
                    }
                }
                onMouseUp={
                    () => {
                        this.windowSizePosition = null;
                        this.widnowSizeSwitch = false;
                        this.windowsStyle = {
                            pointerEvents: "none"
                        };
                        this.setState({ windowsStyle: this.windowsStyle });
                    }
                }
                style={this.windowsStyle}
            >
                {
                    this.windows.map((v, index) => {
                        let appContent = v.app;

                        return (
                            <div
                                key={index.toString()}
                            >
                                <div className="window-outside-frame"
                                    style={{
                                        height: v.height + 8,
                                        width: v.width + 8,
                                        left: v.left - 4,
                                        top: v.top - 4,
                                        cursor: v.outsudeFrameStyle,
                                        pointerEvents: v.style.pointerEvents
                                    }}
                                    onMouseDown={
                                        (e) => {
                                            this.widnowSizeSwitch = true;
                                            this.windowsStyle = {
                                                pointerEvents: "auto"
                                            }
                                            this.setState({ windowsStyle: this.windowsStyle });
                                        }
                                    }
                                    onMouseMove={
                                        (e) => {
                                            let windowData = this.windows[index];
                                            if (this.widnowSizeSwitch) return;
                                            this.windowSizeFocus = index;
                                            if (e.clientX <= windowData.left) { // left
                                                v.outsudeFrameStyle = "col-resize";
                                                this.windowSizePosition = 1;
                                            } else if (e.clientX >= windowData.left + windowData.width) { // right
                                                v.outsudeFrameStyle = "col-resize";
                                                this.windowSizePosition = 2;
                                            } else if (e.clientY <= windowData.top) { // top
                                                v.outsudeFrameStyle = "row-resize";
                                                this.windowSizePosition = 3;
                                            } else if (e.clientY >= windowData.top + windowData.height) { // bottom
                                                v.outsudeFrameStyle = "row-resize";
                                                this.windowSizePosition = 4;
                                            }
                                            this.setWindow();
                                        }
                                    }
                                    onMouseOut={
                                        () => {
                                            if (!this.widnowSizeSwitch) {
                                                v.outsudeFrameStyle = "auto";
                                                this.setWindow();
                                            }
                                        }
                                    }
                                >

                                </div>
                                <div className="window"
                                    style={{
                                        height: v.height,
                                        width: v.width,
                                        left: v.left,
                                        top: v.top,
                                        opacity: v.style.opacity,
                                        pointerEvents: v.style.pointerEvents
                                    }}
                                    onMouseDown={
                                        () => {
                                            this.windowsFocus(index);
                                        }
                                    }
                                >
                                    <div className="window-header"
                                        onMouseDown={
                                            (e) => {
                                                // this.windowsFocus(index);
                                                this.windowMobileSwitch = true;
                                                this.windowFocus = this.windows.length - 1;
                                                this.windowMobileXY = [
                                                    e.clientX - this.windows[index].left,
                                                    e.clientY - this.windows[index].top
                                                ];
                                                this.windowsStyle = {
                                                    pointerEvents: "auto"
                                                }
                                                this.setState({ windowsStyle: this.windowsStyle });
                                            }
                                        }

                                        onMouseUp={
                                            () => {
                                                this.windowMobileSwitch = false;
                                                this.windowFocus = null;
                                                this.windowsStyle = {
                                                    pointerEvents: "none"
                                                }
                                                this.setState({ windowsStyle: this.windowsStyle });
                                            }
                                        }


                                    >
                                        <img className="window-icon" src={v.icon} />
                                        <div className="window-title">
                                            {v.title}
                                        </div>
                                        <span className="window-tool">
                                            <div className="window--"
                                                onClick={
                                                    () => {
                                                        this.windowHideFun(index);
                                                    }
                                                }
                                            >
                                            </div>
                                            <div className="window-x"
                                                onMouseUp={
                                                    (e) => {
                                                        this.windowDeleteFun(index);
                                                    }
                                                }
                                            >
                                            </div>

                                        </span>
                                    </div>
                                    <div className="window-content">
                                        {
                                            appContent
                                        }
                                    </div>
                                </div>

                            </div>
                        );
                    })
                }
            </div>
        );
    }

    private windowMobile(event: React.MouseEvent<HTMLDivElement, MouseEvent>, index: number) {
        if (this.windowMobileSwitch) {
            this.windows[index].left = event.clientX - this.windowMobileXY[0];
            this.windows[index].top = event.clientY - this.windowMobileXY[1];
            this.setWindow();
        }
    }

    private windowsFocus(index: number) {
        let window = this.windows[index];
        this.windows.splice(index, 1);
        this.windows.push(window);
        this.setWindow();
    }

    private windowSize(event: React.MouseEvent<HTMLDivElement, MouseEvent>, index: number) {
        if (this.windowSizePosition === 4) { // bottom
            let changeY = event.clientY - this.windows[index].top;
            if (changeY > 300)
                this.windows[index].height = changeY;
        } else if (this.windowSizePosition === 3) { // top
            let changeY = this.windows[index].top + this.windows[index].height - event.clientY;
            console.log(changeY);
            if (changeY > 300) {
                this.windows[index].top = event.clientY + 2;
                this.windows[index].height = changeY - 2;
            }
        } else if (this.windowSizePosition === 2) { // right
            let changeX = event.clientX - this.windows[index].left - 2;
            if (changeX > 300)
                this.windows[index].width = changeX;
        } else if (this.windowSizePosition === 1) { // left
            let changeX = this.windows[index].left + this.windows[index].width - event.clientX - 2;
            if (changeX > 300) {
                this.windows[index].left = event.clientX + 2;
                this.windows[index].width = changeX;
            }
        }
        this.setWindow();
    }

    private setWindowSetting(index: number) {
        return (
            title: string | undefined,
            width: number | undefined,
            height: number | undefined,
            top: number | undefined,
            left: number | undefined,
            icon: string | undefined,
        ) => {
            const windowSetting = this.windows[index];
            this.windows[index] = {
                title: title === undefined ? windowSetting.title : title,
                width: width === undefined ? windowSetting.width : width,
                height: height === undefined ? windowSetting.height : height,
                top: top === undefined ? windowSetting.top : top,
                left: left === undefined ? windowSetting.left : left,
                icon: icon === undefined ? windowSetting.icon : icon,
                style: windowSetting.style,
                app: windowSetting.app,
                outsudeFrameStyle: windowSetting.outsudeFrameStyle
            }
            this.setWindow();
        }
    }

    private setWindow() {
        this.setState({ windows: this.windows });
    }
}