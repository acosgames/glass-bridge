import fs from 'flatstore';
import GlassPanel from './GlassPanel';
import Lemming from './Lemming';
import Timeboard from './Timeboard';

function GlassBridge(props) {

    const round = props['state-round'];

    const renderPanels = () => {

        let state = fs.get('state');
        let lives = state?.lives || 0;

        let panels = [];

        let visibleCount = 4;
        let start = Math.max(0, (round + 1) - visibleCount)
        let end = start + visibleCount;
        for (var i = start; i <= end; i++) {

            if (i == 0) {
                panels.push(<StartArea key={'row0'} />);
                continue;
            }

            let history = -1;
            if (state.history && i < state.history.length)
                history = state.history[i];

            panels.push(
                <div key={'row-' + i} className={'row'}>
                    <GlassPanel side={0} broken={history == 1} row={i} />
                    <GlassPanel side={1} broken={history == 0} row={i} />
                </div>
            )
        }

        return panels;
    }

    return (
        <>
            {renderPanels()}
        </>
    )
}

function StartArea(props) {

    let state = fs.get('state');
    let round = state?.round;
    let lives = state?.lives;

    const renderDots = () => {
        let dots = [];
        let count = lives - round;
        for (var i = 0; i < count; i++) {
            dots.push(
                <Lemming key={'lemming' + i} />
            )
        }
        return dots;
    }

    return (
        <div key={'row-0'} className="startarea">

            {renderDots()}
        </div>
    )
}

export default fs.connect(['state-round'])(GlassBridge);