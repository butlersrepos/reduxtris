let GameStates = require('../game-logic/GameStates');

<game-over-menu>
    <h1>
        <span class="you">YOU</span> <span class="lose">LOSE!</span>
    </h1>

    <script>
        playSounds() {
            setTimeout(this.playYou, 250)
            setTimeout(this.playLose, 1250)
        }

        playYou () { document.getElementById('you-sound').play() }
        playLose () { document.getElementById('lose-sound').play() }

        this.playSounds()
    </script>
    
    <style scoped=scoped>
        :scope {
            position: absolute;
            width: 640px;
            height: 480px;
            display: flex;
            justify-content: center;
            align-items: center;

            .you, 
            .lose { 
                opacity: 0; 
                animation: .5s ease-in-out forwards fade-in;
            }
            
            .lose {
                animation-delay: 1s;
            }
        }

        @keyframes fade-in {
            0% {
                opacity: 0;
                font-size: 1em;
            }

            75% {
                font-size: 1.4em;
            }

            100% {
                opacity: 1;
                font-size: 1.3em;
            }
        }
    </style>
</game-over-menu>