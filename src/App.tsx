import React from 'react';
import { Axios } from "./methods/Axios";
import "./sass/Main.sass";
import Dock from "./components/dock";
import Desktop from "./components/desktop";
import Windows from "./components/windows";
import { window } from "./type/window";
import Works from "./components/works";

class App extends React.Component {

    //private ws: MessageWS;
    private windows: Array<window>;
    private windowsZIndex: Array<number>;

    constructor(props: React.Component<{}, {}, any>) {
        super(props)
        this.windows = [
        ];
        this.windowsZIndex = [];
        //this.ws = new MessageWS("ws://127.0.0.1:8000")
    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                </header>
                <Works
                    windows={this.windows}
                    windowHide={this.windowHide()}
                    windowDelete={this.deleteWindow()}
                    windowsZIndex={this.windowsZIndex}
                />
                <Desktop windowsAdd={this.addWindow()} />
                <Windows
                    windows={this.windows}
                    windowHide={this.windowHide()}
                    windowDelete={this.deleteWindow()}
                    windowsZIndex={this.windowsZIndex}
                />
                <Dock windowsAdd={this.addWindow()} />
            </div>
        );
    }

    addWindow() {
        return (title: string, icon: string, app: JSX.Element) => {
            this.windows.push({
                title: title,
                icon: icon,
                width: 800,
                height: 600,
                left: document.body.clientWidth / 2 - 400 + this.windows.length * 20,
                top: document.body.clientHeight / 2 - 300 + this.windows.length * 20,
                style: { opacity: 1 },
                outsudeFrameStyle: "auto",
                app: app
            });
            this.windowsZIndex.push(this.windows.length - 1);
            this.setState({ windows: this.windows });
        }
    }

    private deleteWindow() {
        return (index: number) => {
            this.windows.splice(index, 1);
            let windowZIndex = this.windowsZIndex.indexOf(index);
            this.windowsZIndex.splice(windowZIndex, 1);
            this.windowsZIndex.map(v => {
                if (v > index) return v - 1;
                else return v;
            })
            this.setState({ windows: this.windows });
        }
    }

    windowHide() {
        return (index: number) => {
            if (this.windows[index].style.opacity) {
                this.windows[index].style = {
                    opacity: 0,
                    pointerEvents: "none"
                };
            } else {
                this.windows[index].style = {
                    opacity: 1,
                    pointerEvents: "auto"
                };
            }
            this.setState({ windows: this.windows });
        }

    }
};

export default App;
