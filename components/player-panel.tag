<player-panel>
    <h1 class="level">Level: { level }</h1>
    <h1 class="score">Score: { score }</h1>

    <script>
        this.level = window.Store.getState().level
        this.score = window.Store.getState().score
    
        window.Store.subscribe(() => {
            this.level = window.Store.getState().level
            this.score = window.Store.getState().score
            this.update()
        });
    </script>
</player-panel>