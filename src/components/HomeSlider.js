import React from 'react';
import { useSelector } from 'react-redux';

const HomeSlider = () => {
  const { totalParks } = useSelector((store) => store.parkData);

  return (
    <main>
      <div className="web-title">
        <h1>Wild Vista</h1>
      </div>
      <div>
        <h3>
          {totalParks}
          Parks to explore
        </h3>
      </div>
      <div>
        <h3>535 Activities</h3>
      </div>
    </main>
  );
};

export default HomeSlider;
