import React, { useState, useEffect } from 'react';

import TechItem from './TechItem';

const TechListModal = () => {
  const [techs, setTechs] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getTechs();
    // eslint-disable-next-line
  }, []);

  const getTechs = async () => {
    setLoading(true);

    const data = await fetch('/techs').then(res => res.json());

    setTechs(data);
    setLoading(false);
  };

  return (
    <div id='tech-list-modal' className='modal'>
      <div className='modal-content'>
        <h4>Technicians</h4>
        <ul className='collection'>
          {!loading && techs.length === 0 ? (
            <p className='center'>No technicians</p>
          ) : (
            techs.map(tech => <TechItem key={tech.id} tech={tech} />)
          )}
        </ul>
      </div>
    </div>
  );
};

export default TechListModal;
