
export const UPDATE_WEB3 = 'update_web3';

export function updateWeb3(web3) {
    return dispatch => {
                dispatch({
                    type: UPDATE_WEB3,
                    payload: {
                        web3
                    }
                });
            }
}