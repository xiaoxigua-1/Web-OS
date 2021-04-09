import React from 'react';
import { MessageWS } from "./methods/websocket";
import { Axios } from "./methods/Axios";
import "./sass/Main.sass";
import Dock from "./components/dock";
import Desktop from "./components/desktop";
import Windows from "./components/windows";

class App extends React.Component {

    //private ws: MessageWS;

    constructor() {
        super({})
        //this.ws = new MessageWS("ws://127.0.0.1:8000")
        //console.log(this.ws)
    }

    render() {
        return (
            <div className="App">
                <header className="App-header">

                </header>
                <Desktop />
                <Dock />
                <Windows />
            </div>
        );
    }
};

export default App;
