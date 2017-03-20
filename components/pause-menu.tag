let Actions = require('../state-stuff/Actions');

<pause-menu>
	<button onclick={ unpause }>PAUSED</button>

	<script>
		unpause() {
			Store.dispatch(Actions.unpauseGame())
		}
	</script>
	
	<style scoped=scoped>
		:scope {
			display: flex;
			justify-content: center;
			align-items: center;
			position: absolute;
			color: white;
			width: 640px;
			height: 480px;

			button {
				background: #FF4136;

				&.active {
                    box-shadow: inset 5px 5px 10px darken(#FF4136, 25%);
                }
			}
		}
	</style>
</pause-menu>