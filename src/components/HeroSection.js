import React from 'react';
import { useSelector } from 'react-redux';

const HeroSection = () => {
  const { totalParks, totalActivities } = useSelector((store) => store.parkData);

  return (
    <>
      <main>
        <div className="totalparks">
          <h3 className="stats">
            {totalParks}
          </h3>
          <h4>
            Parks to explore
          </h4>
        </div>
        <div className="totalactivities">
          <h3 className="stats">
            {totalActivities}
          </h3>
          <h4>
            Activities
          </h4>
        </div>
      </main>
    </>
  );
};

export default HeroSection;
