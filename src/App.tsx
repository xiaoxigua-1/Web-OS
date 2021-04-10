import React from 'react';
import { MessageWS } from "./methods/websocket";
import { Axios } from "./methods/Axios";
import "./sass/Main.sass";
import Dock from "./components/dock";
import Desktop from "./components/desktop";
import Windows from "./components/windows";
import { window } from "./type/window";

class App extends React.Component {

    //private ws: MessageWS;
    private windows: Array<window>;
    constructor(props: React.Component<{}, {}, any>) {
        super(props)
        this.windows = [
        ];
        //this.ws = new MessageWS("ws://127.0.0.1:8000")
    }

    render() {
        return (
            <div className="App">
                <header className="App-header">

                </header>
                <Desktop />
                <Dock windowsAdd={this.addWindow()} />
                <Windows windows={this.windows} />
            </div>
        );
    }

    addWindow() {
        return (title: string, icon: string, app: any) => {
            this.windows.push({
                title: title,
                icon: icon,
                width: "300px",
                height: "300px",
                left: document.body.clientWidth / 2 - 150 + this.windows.length * 10,
                top: document.body.clientHeight / 2 - 150 + this.windows.length * 10,
                style: {},
                content: app
            })
            this.setState({windows: this.windows});
        }
    }
};

export default App;
