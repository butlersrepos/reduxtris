let initialState = {
	message: ''
};

module.exports = function (state, action) {
	let mergedState = Object.assign({}, initialState, state);
	let nextState = JSON.parse(JSON.stringify(mergedState));

	switch (action.type) {
		case 'SET_MESSAGE':
			nextState.message = action.value;
			break;
		default:
			return state;
	}

	return nextState;
};