import React from 'react';
import './sass/App.sass';
import { MessageWS } from "./methods/websocket";
import { Axios } from "./methods/Axios";
import Loading from "./components/loading";

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
                    <Loading />
                </header>
            </div>
        );
    }
};

export default App;
