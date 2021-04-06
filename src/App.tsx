import React from 'react';
import logo from './logo.svg';
import './sass/App.sass';
import { MessageWS } from "./methods/websocket";
import { Axios } from "./methods/Axios";

class App extends React.Component {

    private ws: MessageWS;

    constructor() {
        super({})
        this.ws = new MessageWS("ws://127.0.0.1:8000")
        console.log(this.ws)
    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <p>
                        Edit <code>src/App.tsx</code> and save to reload.
        			</p>
                    <a
                        className="App-link"
                        href="https://reactjs.org"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Learn React
                    </a>
                    <button onClick={ () => { this.ws.send("wdasdwa") } }>dsadwasd</button>
                </header>
            </div>
        );
    }
};

export default App;
