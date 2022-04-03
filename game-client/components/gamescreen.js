
import Timeboard from './Timeboard';

import fs from 'flatstore';
import { useState } from 'react';
import WelcomeScreen from './WelcomeScreen';
import GlassBridge from './GlassBridge';

function GameScreen(props) {

    const [isReady, setIsReady] = useState(false);


    if (!isReady) {
        return (<WelcomeScreen setIsReady={setIsReady}></WelcomeScreen>)
    }

    return (
        <>
            <div className="gamescreen">
                {/* <Scoreboard /> */}
                <div className="gamearea-wrapper">
                    <GlassBridge />
                </div>
                <Timeboard />
            </div>
        </>
    )
}


export default GameScreen;