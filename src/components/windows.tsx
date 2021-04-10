import React from 'react';
import "../sass/Windows.sass";
import appicon from"./img/a.jpeg"
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
    private windowSizeSwitch: boolean;

    constructor(props: windows) {
        super(props);
        this.windowMobileSwitch = false;
        this.width = 300;
        this.heigth = 300;
        this.x = document.body.clientWidth / 2 - 150;
        this.y = document.body.clientHeight / 2 -150
        this.windows = props.windows;
        this.windowFocus = null;
        this.windowsStyle = {};
        this.windowsFocusIndex = null;
        this.windowInitX = 0;
        this.windowInitY = 0;
        this.windowSizeSwitch = false;
    }
    
    render() {

        return (
            <div id="windows"
                onMouseMove={
                    (e) => {
                        if(this.windowFocus !== null)
                            this.windowMobile(e, this.windowFocus);
                    }
                }
                style={this.windowsStyle}
            >
                {
                    this.windows.map((v, index) => {
                        return(
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
                                    <img className="window-icon" src={appicon} />
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
                                        v.content
                                    }
                                </div>
                                <div className="window-bottom">

                                </div>
                            </div>
                        );
                    })
                }
            </div>
        );
    }

    private windowMobile(event: React.MouseEvent<HTMLDivElement, MouseEvent>, index: number) {
        if(this.windowMobileSwitch) {
            this.x = event.clientX - this.width / 2;
            this.y = event.clientY - 15;
            if(
                this.x + this.width > document.body.clientWidth ||
                this.y + this.heigth > document.body.clientHeight ||
                this.x < 0 ||
                this.y < 0
                ) {
                
            } else {

            }
            this.setWindow(index);
        }
    }

    private windowsFocus(index: number) {
        this.windowsFocusIndex = index;
    }

    private windowSize(event: React.MouseEvent<HTMLDivElement, MouseEvent>, index: number, position: number) {
        let YAmountOfChange = this.windowInitY - event.clientY;
        let XAmountOfChange = this.windowInitX - event.clientX;
        if(position === 1) {
            this.heigth += YAmountOfChange;
        }

        this.setWindow(index);
    }

    private hideWindow(index: number) {
        this.windows[index].style = {
            opacity: 0,

        };
        this.setState({ windows: this.windows });
    }

    private deleteWindow(index: number) {
        this.windows.splice(index, 1);
        this.setState({ windows: this.windows });
    }

    private setWindow(index: number) {
        this.windows[index].width = this.width + "px";
        this.windows[index].height = this.heigth + "px";
        this.windows[index].left = this.x;
        this.windows[index].top = this.y;
        this.setState({ windows: this.windows });
    }
}