let Actions = require('../state-stuff/Actions');

<game-view onclick={ rotate }>
    <div class="game-row" each={ row, y in this.gameGrid }>
        <virtual each={ col, x in row }>
            <grid-block block-type="{ col }"></grid-block>
        </virtual>
    </div>

    <script>
        extractState() {
            this.gameGrid = Store.getState().gameGrid
            this.gamePiece = Store.getState().currentPiece
        }

        this.extractState()

        Store.subscribe(() => {
            this.extractState()
            this.update()
        })

        rotate() { Store.dispatch(Actions.rotatePiece()) }
    </script>

    <style scoped=scoped>
        :scope {
            .game-row {
                display: flex;
            }
        }
    </style>
</game-view>