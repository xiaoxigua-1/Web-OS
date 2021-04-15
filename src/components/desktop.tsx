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
    private indexX: number;
    private indexY: number;

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
            { icon: appIcon, name: "ww", app: "ww", top: 0, left: 0, circle: false },
            { icon: appIcon, name: "ww", app: "ww", top: 0, left: 0, circle: false },
            { icon: appIcon, name: "ww", app: "ww", top: 0, left: 0, circle: false },
            { icon: appIcon, name: "ww", app: "ww", top: 0, left: 0, circle: false },
            { icon: appIcon, name: "ww", app: "ww", top: 0, left: 0, circle: false },
            { icon: appIcon, name: "ww", app: "ww", top: 0, left: 0, circle: false },
            { icon: appIcon, name: "ww", app: "ww", top: 0, left: 0, circle: false },
            { icon: appIcon, name: "ww", app: "ww", top: 0, left: 0, circle: false },
            { icon: appIcon, name: "ww", app: "ww", top: 0, left: 0, circle: false },
            { icon: appIcon, name: "ww", app: "ww", top: 0, left: 0, circle: false },
            { icon: appIcon, name: "ww", app: "ww", top: 0, left: 0, circle: false }
        ];
        this.indexX = 0;
        this.indexY = 0;
        this.iconXY()();
        window.onresize = this.iconXY();
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

                <div id="icons">
                    {
                        this.icons.map((v, index) => {
                            return (
                                <div
                                    className="desktop-icon"
                                    title={v.name}
                                    key={index.toString()}
                                    tabIndex={index}
                                    style={{
                                        top: v.top,
                                        left: v.left,
                                        backgroundColor: v.circle ? "rgba(255, 255, 255, 0.3)" : ""
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
                                </div>
                            );
                        })
                    }
                </div>

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
        this.iconCircle(left, top);
        this.setState({ style: this.style });
    }

    iconXY() {
        return () => {
            this.indexX = 0;
            this.indexY = 0;
            this.icons.map((v, index) => {
                if (document.body.clientHeight < this.indexY + 300) {
                    this.indexY = 0;
                    this.indexX += 136;
                } else if (index !== 0) {
                    this.indexY += 115;
                }
                v.top = this.indexY;
                v.left = this.indexX;
                return v;
            })
            this.setState({ icons: this.icons });
        }
    }

    iconCircle(left: number, top: number) {
        this.icons.map((v, index) => {
            if (
                left < v.left + 70 + 136 &&
                left + this.width > v.left + 70 &&
                top < v.top + 70 + 115 &&
                top + this.height > v.top + 70
            ) {
                v.circle = true;
            } else {
                v.circle = false;
            }
        })
    }
}