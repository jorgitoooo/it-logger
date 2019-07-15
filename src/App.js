import React, { useEffect, Fragment } from 'react';

import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css/dist/js/materialize.min.js';

import './App.css';

import AddBtn from './components/layout/AddBtn';
import SearchBar from './components/layout/SearchBar';
import Logs from './components/logs/Logs';

import AddLogModal from './components/logs/AddLogModal';
import EditLogModal from './components/logs/EditLogModal';
import AddTechModal from './components/techs/AddTechModal.js';
import TechListModal from './components/techs/TechListModal';

const App = () => {
  useEffect(() => {
    // Init materialize js
    M.AutoInit();
  });

  return (
    <Fragment>
      <SearchBar />
      <div className='container'>
        <AddBtn />
        <AddLogModal />
        <AddTechModal />
        <EditLogModal />
        <TechListModal />
        <Logs />
      </div>
    </Fragment>
  );
};

export default App;
