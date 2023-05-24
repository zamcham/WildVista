import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import StateCard from './StateCard';

const DataContainer = () => {
  const { statesData } = useSelector((store) => store.parkData);
  const [searchTerm, setSearchTerm] = useState('');
  const history = useNavigate();

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleStateCardClick = () => {
    history.push('/details');
  };

  // Filter the stateArray based on the search term
  const filteredStateArray = Object.values(statesData).filter((state) => {
    const stateCode = state.stateCode.toLowerCase();
    const search = searchTerm.toLowerCase();
    return stateCode.includes(search);
  });

  return (
    <>
      <input
        className="search-bar"
        type="text"
        placeholder="Search state..."
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <div className="states-container">
        {filteredStateArray.map((state) => (
          <StateCard
            key={state.id}
            stateCode={state.stateCode}
            stateParks={state.totalParks}
            stateTotalActivities={state.totalActivities}
            stateTotalTopics={state.totalTopics}
            onClick={() => handleStateCardClick(state.stateCode)}
          />
        ))}
      </div>
    </>

  );
};

export default DataContainer;
