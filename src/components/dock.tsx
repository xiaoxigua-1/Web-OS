import React from 'react';
import "../sass/Dock.sass";
import a from "./a.jpeg";
export default class Loading extends React.Component {

    private appList: Array<any>;

    constructor(props: any) {
        super(props);
        this.appList = [
            { icon: a, appName: "dsa", height:"50px", id: 0 },
            { icon: a, appName: "sad", height:"50px", id: 1 },
            { icon: a, appName: "sad", height:"50px", id: 2 },
            { icon: a, appName: "sdsad", height:"50px", id: 3 }
        ]
        this.setState({ appList: this.appList })
    }

    render() {
        return (
            <div id="Dock">
                <div className="apps">
                {
                    this.appList.map(v => {
                        return(
                            <div className="app" 
                                style={{ height: v.height }}
                                onMouseOver={
                                    () => {
                                        this.iconHeight(v.id);
                                    }
                                }
                                onMouseOut={ 
                                    () => {
                                        this.iconHeightInit(v.id);
                                    }
                                 }
                                onClick={
                                    () => {

                                    }
                                }
                            >
                                <img title={v.appName} src={v.icon}/>
                            </div>
                        );
                    })
                }
                </div>
            </div>
        );
    }

    iconHeight(id: number) {
        if (id !== 0) {
            this.appList[id - 1].height = "65px";
        }
        if (id !== this.appList.length -1) {
            this.appList[id + 1].height = "65px";
        }
        this.appList[id].height = "80px";
        this.setState({ appList: this.appList });
        console.log(this.appList);
    }

    iconHeightInit(id: number) {
        if (id !== 0) {
            this.appList[id - 1].height = "50px";
        }
        if (id !== this.appList.length -1) {
            this.appList[id + 1].height = "50px";
        }
        this.appList[id].height = "50px";
        this.setState({ appList: this.appList });
    }
}