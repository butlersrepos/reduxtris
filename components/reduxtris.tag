let GameStates = require('../game-logic/game-states');
let Actions = require('../state-stuff/actions');

<reduxtris>
    <player-panel class="{ notPlaying ? 'dimmed' : ''}"></player-panel>
    <game-view class="{ notPlaying ? 'dimmed' : ''}"></game-view>
    <stats-panel class="{ notPlaying ? 'dimmed' : ''}"></stats-panel>
    <start-menu if={ beforeStart }></start-menu>
	<pause-menu if={ isPaused }></pause-menu>
    <game-over-menu if= { gameOver }></game-over-menu>

    <script>
        extractState() {
            this.beforeStart = Store.getState().gameState == GameStates.BEFORE_START
			this.isPaused = Store.getState().gameState == GameStates.PAUSED
            this.gameOver = Store.getState().gameState == GameStates.GAME_OVER
            this.notPlaying = this.beforeStart || this.isPaused || this.gameOver

            this.update()
        }

        this.extractState();
        Store.subscribe(() => this.extractState())
    </script>
    
    <style scoped=scoped>
        :scope {
            user-select: none;
            font-family: Consolas, monospace, sans-serif;
            display: flex;
            background: #111;
            color: #fff;
            width: 640px;
            height: 480px;
            border: 3px solid black;
            border-radius: 4px;

            player-panel {
                flex-basis: 30%;
            }

            game-view {
                flex-basis: 40%;
            }

            stats-panel {
                flex-basis: 30%;
            }

            player-panel, 
            game-view, 
            stats-panel {
                transition: filter 1s ease-out;
            }
        }

        .dimmed {
            filter: blur(5px);
        }

        button {
            border: 0;
            zoom: 2;
            border-radius: 5px;
            box-shadow: 5px 5px 10px darken(#0074D9, 25%);
            background: #0074D9;
            font-weight: bold;
            padding: 10px;
            color: #fff;

            &.active {
                box-shadow: inset 5px 5px 10px darken(#0074D9, 25%);
            }
        }
    </style>
</reduxtris>