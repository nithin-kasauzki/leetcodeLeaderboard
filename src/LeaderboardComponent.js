import React, { useEffect, useState } from "react";
import "./Leaderboard.css";

const Leaderboard = React.memo((props) => {
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    setLeaderboard(props.leaderboard);
    console.log("HR", leaderboard);
  }, [props.leaderboard]);

  return (
    <div className="container">
      <h1>Leaderboard</h1>
      <table className="table">
        <thead>
          <tr>
            <th>Position</th>
            <th>UserName</th>
            <th>RATING</th>
            <th>WorldRank</th>
          </tr>
        </thead>
        <tbody>
          {leaderboard.map((player, index) => (
            <tr key={index + 1}>
              <td>{index+1}</td>
              <td>{player.name}</td>
              <td>{player.rating}</td>
              <td>{player.worldRank}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
});

export default Leaderboard;

