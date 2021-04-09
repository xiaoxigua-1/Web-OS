import React from 'react';
import "../sass/Windows.sass";
import appicon from"./img/a.jpeg"

export default class Windows extends React.Component {

    private windows: Array<any>;
    private windowMobileSwitch: boolean;
    private width: number;
    private heigth: number;
    private x: number;
    private y: number;
    private windowFocus: number | null;
    private windowsStyle: React.CSSProperties;

    constructor(props: React.Component<{}, {}, any>) {
        super(props);
        this.windowMobileSwitch = false;
        this.width = 300;
        this.heigth = 300;
        this.x = document.body.clientWidth / 2 - 150;
        this.y = document.body.clientHeight / 2 -150
        this.windows = [
            {
                title: "test",
                icon: appicon,
                width: this.width,
                height: this.heigth,
                left: this.x,
                top: this.y
            },
            {
                title: "test2",
                icon: appicon,
                width: this.width,
                height: this.heigth,
                left: this.x,
                top: this.y
            }
        ];
        this.windowFocus = null;
        this.windowsStyle = {};
    }
    
    render() {

        return (
            <div id="windows"
                onMouseMove={
                    (e) => {
                        console.log(e.clientX);
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
                                    top: v.top
                                }}
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
                                        <div className="window--">
                                        </div>
                                        <div className="window-x">
                                        </div>
        
                                    </span>
                                </div>
                                <div className="window-content">

                                </div>
                                <span className="window-top">

                                </span>
                                <span className="window-bottom">

                                </span>
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
            this.setWindow(index);
        }
    }

    private windowSize(event: React.MouseEvent<HTMLDivElement, MouseEvent>, index: number, position: number) {

    }

    private setWindow(index: number) {
        this.windows[index].width = this.width;
        this.windows[index].heigth = this.heigth;
        this.windows[index].left = this.x + "px";
        this.windows[index].top = this.y + "px";
        this.setState({ windows: this.windows });
    }

    addWindow() {

    }
}