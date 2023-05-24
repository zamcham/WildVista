import React from 'react';
import { useSelector } from 'react-redux';

const HomeSlider = () => {
  const { totalParks, totalActivities } = useSelector((store) => store.parkData);

  return (
    <>
      <main>
        <div className="web-title">
          <h1>Wild Vista</h1>
        </div>
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
      <div className="filter-name">
        <h4>Parks, Activities and Topins in all states</h4>
      </div>
    </>
  );
};

export default HomeSlider;
