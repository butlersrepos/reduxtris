let GameStates = require('../game-logic/GameStates');
let Actions = require('../state-stuff/Actions');

<reduxtris>
    <player-panel class="{ notPlaying ? 'dimmed' : ''}"></player-panel>
    <game-view class="{ notPlaying ? 'dimmed' : ''}"></game-view>
    <stats-panel class="{ notPlaying ? 'dimmed' : ''}"></stats-panel>
    <start-menu if={ beforeStart }></start-menu>
	<pause-menu if={ isPaused }></pause-menu>

    <script>
        extractState() {
            this.beforeStart = Store.getState().gameState == GameStates.BEFORE_START
            this.notPlaying = this.beforeStart || this.isPaused || this.gameOver
			this.isPaused = Store.getState().gameState == GameStates.PAUSED

            this.update()
        }

        this.extractState();
        Store.subscribe(() => this.extractState())
    </script>
    
    <style scoped=scoped>
        :scope {
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

            .dimmed {
                filter: blur(5px);
            }
        }
    </style>
</reduxtris>