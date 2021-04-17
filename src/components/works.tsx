import React from "react";
import { windows, window } from "../type/window";
import "../sass/Works.sass"

export default class works extends React.Component<windows> {

    private windows: Array<window>;
    private windowHideFun: (index: number) => void;

    constructor(props: windows) {
        super(props);
        this.windows = props.windows;
        this.windowHideFun = props.windowHide;
    }

    render() {
        return (
            <div id="works" >
                {
                    this.windows.map((v, index) => {
                        return (
                            <div
                                className="work"
                                onClick={
                                    () => {
                                        this.windowHideFun(index);
                                    }
                                }
                                onMouseLeave={
                                    () => {
                                        this.windowPreview(index);
                                    }
                                }
                                key={index.toString()}
                            >
                                <img src={v.icon} />
                                <div className="work-preview">

                                </div>
                            </div>
                        );
                    })
                }
            </div>
        );
    }

    windowPreview(index: number) {

    }
}