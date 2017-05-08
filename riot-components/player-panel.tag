import { level } from '../state-stuff/selectors';

<player-panel>
    <h1 class="level">Level: { level }</h1>
    <h1 class="score">Score: { score }</h1>

    <script>
        this.level = level(Store.getState())
        this.score = Store.getState().score
    
        window.Store.subscribe(() => {
            this.level = level(window.Store.getState())
            this.score = window.Store.getState().score
            this.update()
        });
    </script>
</player-panel>