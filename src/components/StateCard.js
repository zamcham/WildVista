import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { assignState } from '../features/parksSlice';

const StateCard = ({
  stateCode,
  stateParks,
  stateTotalActivities,
  stateTotalTopics,
}) => {
  const dispatch = useDispatch();

  const handleViewDetailsClick = () => {
    dispatch(assignState(stateCode));
  };

  return (
    <div className="state-card">
      <h2>{stateCode}</h2>
      <div className="card-stats">
        <div className="stat">
          <p>{stateParks}</p>
          <p>Parks</p>
        </div>
        <div className="stat">
          <p>{stateTotalActivities}</p>
          <p>Activities</p>
        </div>
        <div className="stat">
          <p>{stateTotalTopics}</p>
          <p>Topics</p>
        </div>
      </div>
      <Link to={`/details/${stateCode}`} onClick={handleViewDetailsClick}>
        View Details
      </Link>
    </div>
  );
};

StateCard.propTypes = {
  stateCode: PropTypes.string.isRequired,
  stateParks: PropTypes.number.isRequired,
  stateTotalActivities: PropTypes.number.isRequired,
  stateTotalTopics: PropTypes.number.isRequired,
};

export default StateCard;
