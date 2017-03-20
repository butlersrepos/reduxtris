let Actions = require('../state-stuff/Actions');
let PieceBag = require('../game-logic/PieceBag');
let GameStates = require('../game-logic/GameStates');

<start-menu onclick={ start }>
    <button>WAN 2 PLAE?!</button>

    <script>
        this.start = () => {
            Store.dispatch(Actions.startGame())
            this.tickIt();
        }

        tickIt() {
            setTimeout(() => {
                if( Store.getState().gameState == GameStates.PLAYING ) {
                    Store.dispatch(Actions.tickGame())
                }
                this.tickIt()
            }, Store.getState().tickTimer);
        }
    </script>
    
    <style scoped=scoped>
        :scope {
            position: absolute;
            width: 320px;
            height: 240px;
            top: 120px;
            left: 160px;
            display: flex;
            justify-content: center;
            align-items: center;
        }
    </style>
</start-menu>