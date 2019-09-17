import { GET_LOGS, SET_LOADING, LOGS_ERROR, ADD_LOG } from './types';

// Get logs
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

// Add log
export const addLog = log => async dispatch => {
  try {
    setLoading();

    await fetch('/logs', {
      method: 'POST',
      body: JSON.stringify(log),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(data =>
        dispatch({
          type: ADD_LOG,
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
