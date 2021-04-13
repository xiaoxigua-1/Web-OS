import React from 'react';
import "../sass/Windows.sass";
import appicon from "./img/a.jpeg"
import { windows, window } from "../type/window";

export default class Windows extends React.Component<{ windows: Array<window> }, {}> {

    private windows: Array<window>;
    private windowMobileSwitch: boolean;
    private width: number;
    private heigth: number;
    private x: number;
    private y: number;
    private windowFocus: number | null;
    private windowsStyle: React.CSSProperties;
    private windowsFocusIndex: number | null;
    private windowInitX: number;
    private windowInitY: number;
    private windowSizePosition: number | null;
    private widnowSizeSwitch: boolean;
    private windowSizeFocus: number | null;

    constructor(props: windows) {
        super(props);
        this.windowMobileSwitch = false;
        this.width = 300;
        this.heigth = 300;
        this.x = document.body.clientWidth / 2 - 150;
        this.y = document.body.clientHeight / 2 - 150
        this.windows = props.windows;
        this.windowFocus = null;
        this.windowsStyle = {};
        this.windowsFocusIndex = null;
        this.windowInitX = 0;
        this.windowInitY = 0;
        this.windowSizePosition = null;
        this.widnowSizeSwitch = false;
        this.windowSizeFocus = null;
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
                            <div>
                                <div className="window-outside-frame"
                                    style={{
                                        height: v.height + 8,
                                        width: v.width + 8,
                                        left: v.left - 4,
                                        top: v.top - 4,
                                        cursor: v.outsudeFrameStyle
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
                                            this.windowSizeFocus = index;
                                            if(e.clientX < windowData.left + 50) {
                                                v.outsudeFrameStyle = "col-resize";
                                                this.windowSizePosition = 1;
                                                console.log("left");
                                            } else if(e.clientX > windowData.left + windowData.width + 50) {
                                                v.outsudeFrameStyle = "col-resize";
                                                this.windowSizePosition = 2;
                                                console.log("right");
                                            } else if(e.clientY < windowData.top) {
                                                v.outsudeFrameStyle = "row-resize";
                                                this.windowSizePosition = 3;
                                                console.log("top");
                                            } else if(e.clientY > windowData.top + windowData.height) {
                                                v.outsudeFrameStyle = "row-resize";
                                                this.windowSizePosition = 4;
                                                console.log("bottom");
                                            }
                                            this.setWindow();
                                        }
                                    }
                                    onMouseOut={
                                        () => {
                                            v.outsudeFrameStyle = "auto";
                                            this.setWindow();
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
                                        zIndex: this.windowsFocusIndex === index ? 1 : "auto"
                                    }}
                                    onMouseDown={
                                        () => {
                                            this.windowsFocus(index);

                                        }
                                    }
                                    key={index.toString()}
                                >
                                    <div className="window-header"
                                        onMouseDown={
                                            () => {
                                                this.windowMobileSwitch = true;
                                                this.windowFocus = index;
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
                                                        this.hideWindow(index);
                                                    }
                                                }
                                            >
                                            </div>
                                            <div className="window-x"
                                                onClick={
                                                    (e) => {
                                                        this.deleteWindow(index);
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
            this.windows[index].left = event.clientX - this.windows[index].width / 2 - 48;
            this.windows[index].top = event.clientY - 15;
            this.setWindow();
        }
    }

    private windowsFocus(index: number) {
        this.windowsFocusIndex = index;
        this.setWindow();
    }

    private windowSize(event: React.MouseEvent<HTMLDivElement, MouseEvent>, index: number) {
        if(this.windowSizePosition === 4) {
            let changeY = event.clientY - this.windows[index].top;
            if(changeY > 300)
                this.windows[index].height = changeY;
        } else if(this.windowSizePosition === 2) {
            let changeX = event.clientX - this.windows[index].left - 50;
            if(changeX > 300)
                this.windows[index].width = changeX;
        }
        this.setWindow();
    }

    private hideWindow(index: number) {
        this.windows[index].style = {
            opacity: 0,
        };
        this.setWindow();
    }

    private deleteWindow(index: number) {
        this.windows.splice(index, 1);
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
            //const settingFun = (data: any) => { return data === undefined }
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