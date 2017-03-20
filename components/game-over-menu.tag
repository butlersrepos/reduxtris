let GameStates = require('../game-logic/GameStates');
let Actions = require('../state-stuff/Actions');

<game-over-menu>
    <h1>
        <span class="you">YOU</span> <span class="lose">LOSE!</span>
    </h1>
    <button class={ visible: show } onclick={ restart }>Play Again?</button>

    <script>
        this.show = false

        restart() {
            Store.dispatch(Actions.startGame())
        }

        playSounds() {
            setTimeout(() => {
                this.playYou()
                setTimeout(() => {
                    this.playLose()

                    setTimeout(() => {
                        this.show = true
                        this.update()
                    }, 1000)
                }, 1000)
            }, 250)
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
            flex-direction: column;
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

            button {
                background: #2ECC40;
                visibility: hidden;

                &.visible {
                    visibility: visible;
                }

                &.active {
                    box-shadow: inset 5px 5px 10px darken(#2ECC40, 25%);
                }
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