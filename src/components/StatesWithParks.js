import React from 'react';
import { useSelector } from 'react-redux';
import StateCard from './StateCard';

const StatesWithParks = () => {
  const { statesData } = useSelector((store) => store.parkData);
  // Convert the object's values into an array
  const stateArray = Object.values(statesData);

  return (
    <div className="states-container">
      {stateArray.map((state) => (
        <StateCard
          key={state.id}
          stateCode={state.stateCode}
          stateParks={state.totalParks}
          stateTotalActivities={state.totalActivities}
          stateTotalTopics={state.totalTopics}
        />
      ))}
    </div>
  );
};

export default StatesWithParks;
