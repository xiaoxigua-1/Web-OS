import React from 'react';
import "../sass/Dock.sass";
import a from "./img/a.jpeg";
export default class Loading extends React.Component {

    private appList: Array<any>;

    constructor(props: any) {
        super(props);
        this.appList = [
            { icon: a, appName: "dsa", height: "50px" },
            { icon: a, appName: "sad", height: "50px" },
            { icon: a, appName: "sad", height: "50px" },
            { icon: a, appName: "sdsad", height: "50px" }
        ]
        this.setState({ appList: this.appList })
    }

    render() {
        return (
            <div id="Dock">
                <div className="apps">
                    {
                        this.appList.map((v, index) => {
                            return (
                                <div className="app"
                                    style={{ height: v.height }}
                                    onMouseOver={
                                        () => {
                                            this.iconHeight(index);
                                        }
                                    }
                                    onMouseOut={
                                        () => {
                                            this.iconHeightInit(index);
                                        }
                                    }
                                    onClick={
                                        () => {

                                        }
                                    }
                                >
                                    <img title={v.appName} src={v.icon} />
                                </div>
                            );
                        })
                    }
                </div>
            </div>
        );
    }

    iconHeight(index: number) {
        if (index !== 0) {
            this.appList[index - 1].height = "65px";
        }
        if (index !== this.appList.length - 1) {
            this.appList[index + 1].height = "65px";
        }
        this.appList[index].height = "80px";
        this.setState({ appList: this.appList });
        console.log(this.appList);
    }

    iconHeightInit(index: number) {
        if (index !== 0) {
            this.appList[index - 1].height = "50px";
        }
        if (index !== this.appList.length - 1) {
            this.appList[index + 1].height = "50px";
        }
        this.appList[index].height = "50px";
        this.setState({ appList: this.appList });
    }
}