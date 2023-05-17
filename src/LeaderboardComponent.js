import React, { useEffect, useState } from "react";
import { useTheme } from "@material-ui/core/styles";

const Leaderboard = React.memo((props) => {
  const [leaderboard, setLeaderboard] = useState([]);
  const theme = useTheme();

  useEffect(() => {
    setLeaderboard(props.leaderboard);
    console.log("HR", leaderboard);
  }, [props.leaderboard]);

  const containerStyle = {
    textAlign: "center",
    margin: "auto",
    [theme.breakpoints.up("md")]: {
      maxWidth: "80%", // Adjust the percentage for medium and larger screens
    },
    [theme.breakpoints.down("sm")]: {
      maxWidth: "90%", // Adjust the percentage for small screens
    },
  };

  const tableStyle = {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "20px",
  };

  const thStyle = {
    backgroundColor: "#f5f5f5",
    padding: "12px",
    borderBottom: "1px solid #ddd",
  };

  const tdStyle = {
    padding: "12px",
    borderBottom: "1px solid #ddd",
  };

  return (
    <div style={containerStyle}>
      <h1>Leaderboard</h1>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>Position</th>
            <th style={thStyle}>UserName</th>
            <th style={thStyle}>RATING</th>
            <th style={thStyle}>WorldRank</th>
          </tr>
        </thead>
        <tbody>
          {leaderboard.map((player, index) => (
            <tr key={index + 1}>
              <td style={tdStyle}>{index + 1}</td>
              <td style={tdStyle}>{player.name}</td>
              <td style={tdStyle}>{player.rating}</td>
              <td style={tdStyle}>{player.worldRank}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
});

export default Leaderboard;


