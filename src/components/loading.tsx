import React from 'react';
import "../sass/Loading.sass";

export default class Loading extends React.Component {

    render() {
        let loadingData = [];
        let loadingIcon;
        let style;
        for(let i = 0; i < 20; i++) {
            style = {
                transform: `rotate(${18 * i}deg)`,
                animationDelay: `${0.05 * i}s`
            };
            loadingIcon = <div className="icon" style={ style }></div>;
            loadingData.push(loadingIcon);
        }

        return (
            <div className="loading">
                {loadingData}
            </div>
        );
    }
}