import React from 'react';

class GoalsPage extends React.Component {
  render() {
    return (
      <div>
          <h2>Goals And Challenges</h2>
          <GoalsOverview />
      </div>
    );
  }
}

class GoalsOverview extends React.Component {
  render() {
    return (
      <div>
          <p>No Goals to show</p>
      </div>
    );
  }
}

export default GoalsPage;

export {GoalsPage, GoalsOverview };