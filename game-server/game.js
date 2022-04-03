import cup from './acosg';

let defaultGame = {
    state: {
        history: [-1],
        round: 0,
        lives: 5
    },
    players: {},
    next: {},
    events: {}
}

class GlassBridge {

    onNewGame(action) {
        cup.setGame(defaultGame);

        let state = cup.state();
        state.lives = 6;
        state.round = 0;

        let minTime = 30000;
        cup.setTimelimit(minTime);
        cup.next({ 'id': '*' });
    }

    onSkip(action) {
        let next = cup.next();
        if (!next || !next.id)
            return;

        let players = cup.playerList();

        this.playerLeave(players[0]);
    }

    onJoin(action) {
        cup.log(action);
        if (!action.user.id)
            return;

        let player = cup.players(action.user.id);
        player.score = 0;
    }


    getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
    }


    onLeave(action) {
        this.playerLeave(action.user.id);
    }

    playerLeave(userid) {
        this.setWinner(userid)
    }

    onPick(action) {
        let state = cup.state();
        let correct = this.getRandomInt(0, 2);
        if (action.payload != correct) {
            state.lives--;
        }

        state.history.push(correct);

        if (state.lives <= 0) {
            this.setWinner(action.user.id);
            return;
        }

        state.round = state.round + 1;
    }

    // set the winner event and data
    setWinner(userid) {
        let state = cup.state();
        let player = cup.players(userid);
        player.rank = 1;
        player.score = state.round;
        if (!player) {
            player.id = 'unknown player';
        }

        cup.gameover({
            type: 'winner'
        });
        // cup.next({});
    }
}

export default new GlassBridge();