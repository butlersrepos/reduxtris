<message-banner>
	<h1>{ message }</h1>

	<script>
		extractMyState() {
			this.message = Store.getState().message
			this.update()
		}

		Store.subscribe(() => {
			this.extractMyState()
		})
	</script>
</message-banner>