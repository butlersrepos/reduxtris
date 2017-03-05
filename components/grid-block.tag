let BlockColorChart = require('../view-logic/BlockColorChart');

<grid-block style="--blockColor: { color }; --size: { size }">
    <script>
        this.color = BlockColorChart[this.opts.blockType];
        this.size = '24px';
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