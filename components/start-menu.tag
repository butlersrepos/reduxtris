let Actions = require('../state-stuff/Actions');
let PieceBag = require('../game-logic/PieceBag');

<start-menu onclick={ start }>
    <h1>WAN 2 PLAE?!</h1>

    <script>
        this.start = () => {
            Store.dispatch(Actions.startGame())
            Store.dispatch(Actions.setCurrentPiece(PieceBag.random()))
            this.tickIt();
        }

        tickIt() {
            setTimeout(() => {
                Store.dispatch(Actions.tickGame())
                this.tickIt()
            }, Store.getState().tickTimer);
        }
    </script>
    
    <style scoped=scoped>
        :scope {
            background: #0074D9;
            border-radius: 10px;
            box-shadow: 5px 5px 10px darken(#0074D9, 25%);
            position: absolute;
            width: 320px;
            height: 240px;
            top: 120px;
            left: 160px;
            display: flex;
            justify-content: center;
            align-items: center;

            &:active {
                box-shadow: inset 5px 5px 10px darken(#0074D9, 25%);
            }
        }
    </style>
</start-menu>