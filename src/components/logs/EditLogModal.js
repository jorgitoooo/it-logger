import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { updateLog, clearCurrent } from '../../actions/logActions';

import M from 'materialize-css/dist/js/materialize.min.js';

const EditLogModal = ({ current, updateLog }) => {
  const [message, setMessage] = useState('');
  const [attention, setAttention] = useState(false);
  const [tech, setTech] = useState('');

  useEffect(() => {
    if (current) {
      setMessage(current.message);
      setAttention(current.attention);
      setTech(current.tech);
    }
  }, [current]);

  const onSubmit = () => {
    // May cause probs. if materialize changes name of id
    const toasters = document.getElementById('toast-container');

    if (message === '' || tech === '') {
      if (toasters === null) {
        M.toast({ html: 'Please enter a message and a tech' });
      }
    } else {
      updateLog({
        id: current.id,
        message,
        attention,
        tech,
        date: new Date()
      });

      const modalEl = document.getElementById('edit-log-modal');
      const instance = M.Modal.getInstance(modalEl);

      // Modal will only close on submit if message && tech are not empty
      instance.close();

      M.toast({ html: `Log edited by ${tech}` });

      clearFields();
      clearCurrent();
    }
  };

  const clearFields = () => {
    setMessage('');
    setAttention(false);
    setTech('');
  };

  return (
    <div id='edit-log-modal' className='modal' style={modalStyle}>
      <div className='modal-content'>
        <h4>Enter System Log</h4>
        <div className='row'>
          <div className='input-field'>
            <input
              type='text'
              name='message'
              value={message}
              onChange={e => setMessage(e.target.value)}
            />
          </div>
        </div>
        <div className='row'>
          <div className='input-field'>
            <select
              name='tech'
              value={tech}
              className='browser-default'
              onChange={e => setTech(e.target.value)}
            >
              <option value='' disabled>
                Select Technician
              </option>
              <option value='John Doe'>John Doe</option>
              <option value='Sam Smith'>Sam Smith</option>
              <option value='Jane Wilson'>Jane Wilson</option>
            </select>
          </div>
        </div>
        <div className='row'>
          <div className='input-field'>
            <p>
              <label>
                <input
                  type='checkbox'
                  className='filled-in'
                  checked={attention}
                  value={attention}
                  onChange={e => setAttention(!attention)}
                />
                <span>Needs Attention</span>
              </label>
            </p>
          </div>
        </div>
      </div>
      <div className='modal-footer'>
        <a
          href='#!'
          onClick={onSubmit}
          className='waves-effect waves-light btn blue'
        >
          Enter
        </a>
      </div>
    </div>
  );
};

const modalStyle = {
  width: '75%',
  height: '75%'
};

EditLogModal.propTypes = {
  current: PropTypes.object,
  updateLog: PropTypes.func.isRequired,
  clearCurrent: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return {
    current: state.log.current
  };
};

export default connect(
  mapStateToProps,
  { updateLog, clearCurrent }
)(EditLogModal);
