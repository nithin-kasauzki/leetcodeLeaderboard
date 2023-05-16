import React, { useEffect, useState } from 'react';
import Leaderboard from './Leaderboard';
import fetchUserContestRankingHistory from './api/apiCall';

function App() {
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const name = 'neal_wu';
      const query = `query {
        userContestRanking(username: "${name}") {
          attendedContestsCount
          rating
          globalRanking
        }
      }`;

      try {
        const data = await fetchUserContestRankingHistory(query);
        console.log(data); // Log the fetched data

        // Set the leaderboard state with the fetched data
        setLeaderboard(data.userContestRanking);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>App Component</h1>
      <Leaderboard leaderboard={leaderboard} />
    </div>
  );
}

export default App;
