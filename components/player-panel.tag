<player-panel>
    <h1>Level: { level }</h1>
    <h1>Score: { score }</h1>

    <script>

        this.level = window.Store.getState().level
        this.score = window.Store.getState().score
    
    </script>
</player-panel>