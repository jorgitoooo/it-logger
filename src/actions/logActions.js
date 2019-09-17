import {
  GET_LOGS,
  SET_LOADING,
  LOGS_ERROR,
  ADD_LOG,
  DELETE_LOG,
  UPDATE_LOG,
  SET_CURRENT,
  CLEAR_CURRENT,
  SEARCH_LOGS
} from './types';

// Get logs from server
export const getLogs = () => async dispatch => {
  try {
    setLoading();

    fetch('/logs')
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

// Add log to server
export const addLog = log => async dispatch => {
  try {
    setLoading();

    fetch('/logs', {
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

// Delete log on server
export const deleteLog = id => async dispatch => {
  try {
    setLoading();

    fetch(`/logs/${id}`, {
      method: 'DELETE'
    });

    dispatch({
      type: DELETE_LOG,
      payload: id
    });
  } catch (err) {
    dispatch({
      type: LOGS_ERROR,
      payload: err.response.data
    });
  }
};

// Update log on server
export const updateLog = log => async dispatch => {
  try {
    setLoading();

    fetch(`/logs/${log.id}`, {
      method: 'PUT',
      body: JSON.stringify(log),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(_log =>
        dispatch({
          type: UPDATE_LOG,
          payload: _log
        })
      );
  } catch (err) {
    dispatch({
      type: LOGS_ERROR,
      payload: err.response.data
    });
  }
};

// Search logs on server
export const searchLogs = text => async dispatch => {
  try {
    setLoading();

    fetch(`/logs?q=${text}`)
      .then(res => res.json())
      .then(data => {
        dispatch({
          type: SEARCH_LOGS,
          payload: data
        });
      });
  } catch (err) {
    dispatch({
      type: LOGS_ERROR,
      payload: err.response.data
    });
  }
};

// Set current
export const setCurrent = log => {
  return {
    type: SET_CURRENT,
    payload: log
  };
};

// Delete current
export const clearCurrent = () => {
  return {
    type: CLEAR_CURRENT
  };
};
// Set loading to true
export const setLoading = () => {
  return {
    type: SET_LOADING
  };
};
