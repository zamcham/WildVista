import React from 'react';
import PropTypes from 'prop-types';

const StateCard = ({
  stateCode, stateParks, stateTotalActivities, stateTotalTopics,
}) => (
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
  </div>
);

StateCard.propTypes = {
  stateCode: PropTypes.string.isRequired,
  stateParks: PropTypes.number.isRequired,
  stateTotalActivities: PropTypes.number.isRequired,
  stateTotalTopics: PropTypes.number.isRequired,
};

export default StateCard;
