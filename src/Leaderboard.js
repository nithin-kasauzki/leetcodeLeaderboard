import React from 'react';
import './Leaderboard.css'; // Import the CSS file

class Leaderboard extends React.Component {
  constructor(props) {
    super(props);

    // Initialize the state with dummy leaderboard data
    this.state = {
      leaderboard: [
        { name: 'John', score: 500, percentage: 80 },
        { name: 'Sarah', score: 400, percentage: 75 },
        { name: 'Michael', score: 300, percentage: 70 },
        { name: 'Emily', score: 200, percentage: 65 },
        { name: 'David', score: 100, percentage: 60 },
      ],
    };
  }

  render() {
    // Sort the leaderboard array based on the score in descending order
    const sortedLeaderboard = [...this.state.leaderboard].sort(
      (a, b) => b.score - a.score
    );

    const topThree = sortedLeaderboard.slice(0, 3); // Get the top three ranks
    const remainingRanks = sortedLeaderboard.slice(3); // Get the remaining ranks

    return (
      <div className="container"> {/* Apply the container class */}
        <h1>Leaderboard</h1> {/* Apply the h1 style */}
        <div className="podium">
          {/* Display the top three ranks as a podium */}
          {topThree.map((player, index) => (
            <div key={index} className={`rank-${index + 1}`}>
              <div className="rank-number">{index + 1}</div>
              <div className="rank-player">{player.name}</div>
              <div className="rank-score">{player.score}</div>
            </div>
          ))}
        </div>
        <table className="table">
          <thead>
            <tr>
              <th>Rank</th>
              <th>Name</th>
              <th>Score</th>
              <th>Percentage</th>
            </tr>
          </thead>
          <tbody>
            {/* Display the remaining ranks in a table */}
            {remainingRanks.map((player, index) => (
              <tr key={index}>
                <td>{index + 4}</td>
                <td>{player.name}</td>
                <td>{player.score}</td>
                <td>{player.percentage}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Leaderboard;
