let BlockColorChart = require('../view-logic/block-color-chart');

<grid-block style="--blockColor: { color };">
    <script>
        this.color = BlockColorChart[this.opts.blockType]

        this.on('update', () => {
            this.color = BlockColorChart[this.opts.blockType]
        })
    </script>
    
    <style scoped=scoped>
        :scope {
            display: inline-block;
            height: var(--size);
            width: var(--size);
            background-color: var(--blockColor);
        }
    </style>
</grid-block>