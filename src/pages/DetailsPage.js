import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getParkData } from '../features/parksSlice';
import ParkCard from '../components/ParkCard';

const DetailsPage = () => {
  const dispatch = useDispatch();
  const { activeState, activeStateData, stateIsSelected } = useSelector((state) => state.parkData);

  useEffect(() => {
    if (activeState && stateIsSelected) {
      dispatch(getParkData());
    }
  }, [dispatch, activeState, stateIsSelected]);

  if (activeStateData.length === 0) {
    return (
      <div className="loading">
        <h1>Loading...</h1>
      </div>
    );
  }

  return (
    <div className="park-cards-container">
      {activeStateData.data.map((state) => (
        <ParkCard
          key={state.id}
          fullName={state.fullName}
          parkDescription={state.description}
          parkTotalActivities={state.activities.length}
          parkTotalTopics={state.topics.length}
        />
      ))}
    </div>
  );
};

export default DetailsPage;
