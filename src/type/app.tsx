import React from "react";

interface app {
    app: React.Component
}

export class App extends React.Component<app> {
    private app:React.Component;

    constructor(props: app) {
        super(props);
        this.app = props.app
    }

    render() {
        return (
            <div className="App">
                {
                    this.app
                }
            </div>
        );
    }

}