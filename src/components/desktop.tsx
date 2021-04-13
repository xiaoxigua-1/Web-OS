import React from 'react';
import "../sass/Desktop.sass";



export default class Desktop extends React.Component {

    private windows: Array<any>;
    private style: React.CSSProperties;
    private width: number;
    private height: number;
    private x: number;
    private y: number;
    private opacity: number;
    private icons: Array<any>;

    constructor(props: any) {
        super(props);
        this.windows = [];
        this.x = 0;
        this.y = 0;
        this.width = 0;
        this.height = 0;
        this.opacity = 0;
        this.style = { opacity: 0 };
        this.icons = [{}];
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
                    (e) => {
                        this.clearXY(e);
                    }
                }

                onMouseMove={
                    (e) => {
                        this.updateXY(e)
                    }
                }
            >
                <div id="circle"
                    style={this.style}
                >

                </div>
                
                <div id="icons">

                </div>
                
            </div>
        );
    }

    xyInit(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
        this.x = event.clientX;
        this.y = event.clientY;
        this.opacity = 1;
    }

    clearXY(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
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