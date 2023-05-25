import React from 'react';
import PropTypes from 'prop-types';

const ParkCard = ({
  fullName, parkTotalActivities, parkTotalTopics, parkDescription,
}) => (
  <div className="park-card">
    <div className="park-name-desc">
      <h4>{fullName}</h4>
      <p>{parkDescription}</p>
    </div>
    <div className="park-stats">
      <p className="total-stat-park-card">
        {parkTotalActivities}
      </p>
      <p className="text-park-card">
        Activities
      </p>
    </div>
    <div className="park-stats">
      <p className="total-stat-park-card">
        {parkTotalTopics}
      </p>
      <p className="text-park-card">
        Topics
      </p>
    </div>

  </div>
);

ParkCard.propTypes = {
  fullName: PropTypes.string.isRequired,
  parkDescription: PropTypes.string.isRequired,
  parkTotalActivities: PropTypes.number.isRequired,
  parkTotalTopics: PropTypes.number.isRequired,
};

export default ParkCard;
