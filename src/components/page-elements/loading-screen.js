import React from 'react';

import '../../css/page-elements/loading-screen.css';

function LoadingScreen(props) {
    return (<div className="component component--loading-screen">
        <svg width="120px" height="120px" className="loading-screen__loader" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
            <rect x="0" y="0" width="100" height="100" fill="none"></rect>
            <g>
                <animate attributeName="opacity" dur="2s" repeatCount="indefinite" begin="0s" keyTimes="0;0.33;1" values="1;1;0"></animate>
                <circle cx="50" cy="50" r="40" stroke="#afafb7" fill="none" strokeWidth="6" strokeLinecap="round">
                    <animate attributeName="r" dur="2s" repeatCount="indefinite" begin="0s" keyTimes="0;0.33;1" values="0;22;44"></animate>
                </circle>
            </g>
            <g>
                <animate attributeName="opacity" dur="2s" repeatCount="indefinite" begin="1s" keyTimes="0;0.33;1" values="1;1;0"></animate>
                <circle cx="50" cy="50" r="40" stroke="#5cffd6" fill="none" strokeWidth="6" strokeLinecap="round">
                    <animate attributeName="r" dur="2s" repeatCount="indefinite" begin="1s" keyTimes="0;0.33;1" values="0;22;44"></animate>
                </circle>
            </g>
        </svg>
    </div>);
}

export default LoadingScreen;
