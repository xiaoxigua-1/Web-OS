import React from 'react';
import "../sass/Desktop.sass";
import appIcon from "../icons/PNGS/control-center.png";
import { desktop } from "../type/desktop";

export default class Desktop extends React.Component<desktop> {

    private windowsAddFun: (title: string, icon: string, app: JSX.Element) => void;
    private style: React.CSSProperties;
    private width: number;
    private height: number;
    private x: number;
    private y: number;
    private opacity: number;
    private icons: Array<any>;

    constructor(props: desktop) {
        super(props);
        this.windowsAddFun = props.windowsAdd;
        this.x = 0;
        this.y = 0;
        this.width = 0;
        this.height = 0;
        this.opacity = 0;
        this.style = { opacity: 0 };
        this.icons = [
            {icon: appIcon, name: "ww", app: "ww"},
            {icon: appIcon, name: "ww", app: "dsa"},
            {icon: appIcon, name: "ww"},
            {icon: appIcon, name: "ww", app: "dsa"},
            {icon: appIcon, name: "ww", app: "dsa"},
            {icon: appIcon, name: "ww", app: "dsa"},
            {icon: appIcon, name: "ww", app: "dsa"},
            {icon: appIcon, name: "ww", app: "dsa"},
            {icon: appIcon, name: "ww", app: "dsa"}
        ];
        this.setState({ style: this.style });
    }

    render() {
        return (
            <div id="desktop"
                onMouseDown={
                    (e) => {
                        this.xyInit(e);
                    }
                }

                onMouseUp={
                    () => {
                        this.clearXY();
                    }
                }

                onMouseMove={
                    (e) => {
                        this.updateXY(e)
                    }
                }
            >

                <ul id="icons">
                    {
                        this.icons.map((v, index) => {
                            // let top;
                            // if(document.body.clientHeight - (index + 1) * 115 -70 > 0)
                            //     top = index * 115;
                            // else top = index
                            // let left = 
                            return (
                                <li
                                    className="desktop-icon"
                                    title={v.name}
                                    key={index.toString()}
                                    tabIndex={index}
                                    style={{
                                    }}
                                    onDoubleClick={
                                        () => {
                                            this.windowsAddFun(v.name, v.icon, v.app);
                                        }
                                    }
                                >
                                    <img src={v.icon} />
                                    <div className="desktop-name">
                                        {
                                            v.name
                                        }
                                    </div>
                                </li>
                            );
                        })
                    }
                </ul>

                <div id="circle"
                    style={this.style}
                >
                </div>
            </div>
        );
    }

    xyInit(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
        this.x = event.clientX;
        this.y = event.clientY;
        this.opacity = 1;
    }

    clearXY() {
        this.opacity = 0;
        this.style = {
            opacity: this.opacity
        }
        this.setState({ style: this.style });
    }

    updateXY(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
        if (!this.opacity) return;
        this.width = Math.abs(event.clientX - this.x);
        this.height = Math.abs(event.clientY - this.y);
        let top, left;
        if (this.x > event.clientX) {
            left = this.x - this.width;
        } else {
            left = this.x;
        }

        if (this.y > event.clientY) {
            top = this.y - this.height;
        } else {
            top = this.y;
        }

        this.style = {
            opacity: this.opacity,
            width: this.width,
            height: this.height,
            top: top,
            left: left
        };
        this.setState({ style: this.style });
    }
}