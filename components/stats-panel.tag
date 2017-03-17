<stats-panel>
    <div>Pieces stats</div>
    <div class="piece-diagram">
        { displayPiece.type() }
        <div class="piece-display-row" each={ row, y in [0,1,2,3,4] }>
            <virtual each={ col, x in [0,1,2,3,4] }>
                <grid-block block-type="{ isOccupied(row, col) ? displayPiece.type() : defaultPiece.type() }"></grid-block>
            </virtual>
        </div>
    </div>

    <script>
        this.defaultPiece = { 
            type: function() { return 'X' },
            body: function() { return [] }
        }
        this.displayPiece = this.defaultPiece
        this.originRow = 2
        this.originCol = 2

        isOccupied(row, col) {
            return this.displayPiece.body().some( part => {
                let isCorrectRow = row == this.originRow + part.rowRelativeToOrigin
                let isCorrectCol = col == this.originCol + part.colRelativeToOrigin
                return isCorrectCol && isCorrectRow
            });
        }

        extractState() {
            this.displayPiece = Store.getState().nextPiece || this.defaultPiece
            this.update();
        }

        this.extractState();

        Store.subscribe(() => this.extractState())
    </script>

    <style scoped="scoped">
        :scope {
            .piece-display-row {
                display: flex;
            }
            
            grid-block {
                height: 16px;
                width: 16px;
            }
        }
    </style>
</stats-panel>