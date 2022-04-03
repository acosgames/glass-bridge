import Lemming from "./Lemming";
import fs from 'flatstore';
import { send } from "../acosg";

function GlassPanel(props) {

    const side = props.side;
    const row = props.row;

    let status = 'normal';
    if (props.broken)
        status = 'broken';

    let state = fs.get('state');

    let isFilledRow = (state.history && row < state.history.length && row > (state.history.length - state.lives))

    if (isFilledRow && !props.broken) {
        return (
            <div className={'glassPanel ' + status}>
                <Lemming />
            </div>
        )
    }

    const onClick = (e) => {
        send('pick', side);
    }
    return (
        <div className={'glassPanel ' + status} onClick={onClick}>
            <div className={'glassPanelNumber'}>{row}</div>
        </div>
    )
}

export default GlassPanel;