import GameStates from '../game-logic/game-states';
import Actions from '../state-stuff/actions';
import youSoundFile from '../sounds/you.m4a';
import loseSoundFile from '../sounds/lose.m4a';

<game-over-menu>
    <h1>
        <span class="you">YOU</span> <span class="lose">LOSE!</span>
    </h1>
    <button class={ visible: isShowingButton } onclick={ restart }>Play Again?</button>
    <audio ref="yousound" src="##srcServer##{ youSrc }"></audio>
    <audio ref="losesound" src="##srcServer##{ loseSrc }"></audio>

    <script>
        this.youSrc = youSoundFile
        this.loseSrc = loseSoundFile
        this.isShowingButton = false

        this.on('mount', () => {
            this.refs.yousound.addEventListener('ended', () => this.playLose())
            this.playYou()
            setTimeout(this.showButton, 2000)
        })

        restart() {
            Store.dispatch(Actions.startGame())
        }
    
        playYou () { 
            this.refs.yousound.play()
        }

        playLose () { 
            setTimeout(() => this.refs.losesound.play(), 250) 
        }

        showButton() { 
            this.isShowingButton = true
            this.update()
        }
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