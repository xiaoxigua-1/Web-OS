import React from 'react';
import { MessageWS } from "./methods/websocket";
import { Axios } from "./methods/Axios";
import Dock from "./components/dock";
import "./sass/Main.sass";
import Desktop from "./components/desktop";
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
                
            </div>
        );
    }
};

export default App;
