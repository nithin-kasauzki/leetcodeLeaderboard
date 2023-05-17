import { useEffect, useState } from "react";

function Leaderboard(props) {
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    setLeaderboard(props.leaderboard);
    console.log("HR", leaderboard);
  }, [props.leaderboard]);

  return <></>;
}

export default Leaderboard;
