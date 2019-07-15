import React, { useState } from 'react';

import M from 'materialize-css/dist/js/materialize.min.js';

const AddTechModal = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const onSubmit = () => {
    // May cause probs. if materialize changes name of id
    const toasters = document.getElementById('toast-container');

    if (firstName === '' || lastName === '') {
      if (toasters === null) {
        M.toast({ html: "Please enter technician's first and last name" });
      }
    } else {
      const modalEl = document.getElementById('add-log-modal');
      let instance = M.Modal.getInstance(modalEl);

      console.log(firstName, lastName);
      // Modal will only close on submit if message && tech are not empty
      instance.close();

      clearFields();
    }
  };

  const clearFields = () => {
    setFirstName('');
    setLastName('');
  };

  return (
    <div id='add-tech-modal' className='modal'>
      <div className='modal-content'>
        <h4>New Technician</h4>
        <div className='row'>
          <div className='input-field'>
            <input
              type='text'
              name='firstName'
              value={firstName}
              onChange={e => setFirstName(e.target.value)}
            />
            <label htmlFor='firstName' className='active'>
              First Name
            </label>
          </div>
        </div>
        <div className='row'>
          <div className='input-field'>
            <input
              type='text'
              name='lastName'
              value={lastName}
              onChange={e => setLastName(e.target.value)}
            />
            <label htmlFor='lastName' className='active'>
              Last Name
            </label>
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

export default AddTechModal;
