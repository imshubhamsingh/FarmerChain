export const UPDATE_HEADER = 'update_header';

export function updateHeader(text) {
	return (dispatch) => {
		dispatch({
			type: UPDATE_HEADER,
			text
		});
	};
}
