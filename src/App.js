import React, { useEffect, useState } from "react";
import "./App.css";

import fetchUserContestRankingHistory from "./api/apiCall";
import Leaderboard from "./LeaderboardComponent";
import Papa from 'papaparse';

function App() {
 
  const [rankingData, setRankingData] = useState([]);
  const [dataFetched, setDataFetched] = useState(false); // Flag to track data fetch status

const names = ["neal_wu", "nithin23k", "JOHNKRAM"];


  const fetchData = async () => {
    console.log("Calling me");

    const dataPromises = names.map((name) => {
      const query = `query {
        userContestRanking(username: "${name}") {
          attendedContestsCount
          rating
          globalRanking
        }
      }`;

      return fetchUserContestRankingHistory(query);
    });

    const results = await Promise.all(dataPromises);

    const formattedData = results.map((data, index) => ({
      name: names[index],
      rating: data.data.userContestRanking.rating,
      worldRank: data.data.userContestRanking.globalRanking,
    }));

    // Sort the formattedData array based on rating in descending order
    formattedData.sort((a, b) => b.rating - a.rating);

    setRankingData(formattedData);
    setDataFetched(true); // Set the data fetch flag to true
    console.log(formattedData);
  };

  useEffect(() => {
    fetchData(); // Fetch data on component mount

    const interval = setInterval(fetchData, 30000); // Fetch data every 30 seconds

    return () => {
      clearInterval(interval); // Clean up the interval on component unmount
    };
  }, []);

  return (
    <div>
      <button onClick={fetchData}>
        REFRESH
      </button>
      {rankingData.map((data, index) => (
        <div key={index}>
          <p>Username: {data.name}</p>
          <p>Rating: {data.rating}</p>
          <p>World Rank: {data.worldRank}</p>
        </div>
      ))}
      {dataFetched && <Leaderboard leaderboard={rankingData}></Leaderboard>}
    </div>
  );
}

export default App;