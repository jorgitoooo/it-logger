import { GET_LOGS, SET_LOADING, LOGS_ERROR } from './types';

export const getLogs = () => async dispatch => {
  try {
    setLoading();

    await fetch('/logs')
      .then(res => res.json())
      .then(data =>
        dispatch({
          type: GET_LOGS,
          payload: data
        })
      );
  } catch (err) {
    dispatch({
      type: LOGS_ERROR,
      payload: err.response.data
    });
  }
};

// Set loading to true
export const setLoading = () => {
  return {
    type: SET_LOADING
  };
};
