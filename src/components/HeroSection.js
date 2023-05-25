import React from 'react';
import { useSelector } from 'react-redux';

const HeroSection = () => {
  const {
    stateIsSelected, activeStateData, totalParks,
    totalActivities, selectedStateTotalActivities, activeState,
  } = useSelector((store) => store.parkData);

  return (
    <>
      <main>
        <div className="totalparks">
          <h3 className="stats">
            {stateIsSelected ? activeStateData.total : totalParks}
          </h3>
          <h4>
            Parks to explore
          </h4>
        </div>
        <div className="totalactivities">
          <h3 className="stats">
            {stateIsSelected ? selectedStateTotalActivities : totalActivities}
          </h3>
          <h4>
            Activities
          </h4>
        </div>
        <div className="location">
          In
          {' '}
          {stateIsSelected ? activeState : 'The United States'}
        </div>
      </main>
    </>
  );
};

export default HeroSection;
