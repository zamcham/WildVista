import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import StateCard from './StateCard';

const StatesWithParks = () => {
  const { statesData } = useSelector((store) => store.parkData);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
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
          />
        ))}
      </div>
    </>

  );
};

export default StatesWithParks;
