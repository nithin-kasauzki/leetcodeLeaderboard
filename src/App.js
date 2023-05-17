import React, { useEffect, useState } from "react";
import "./App.css";

import fetchUserContestRankingHistory from "./api/apiCall";


function App() {
  const names = ["neal_wu", "nithin23k", "JOHNKRAM"]; // List of names
  const [rankingData, setRankingData] = useState([]);
  const [dataFetched, setDataFetched] = useState(false); // Flag to track data fetch status

  const fetchData = async () => {
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
    if (!dataFetched) {
      fetchData(); // Fetch data only if it hasn't been fetched already
    }
  }, []); // Run the effect whenever the data fetch flag changes

  return (
    <div>
      <button onClick={fetchData}>REFRESH</button>
      {rankingData.map((data, index) => (
        <div key={index}>
          <p>Username: {data.name}</p>
          <p>Rating: {data.rating}</p>
          <p>World Rank: {data.worldRank}</p>
        </div>
      ))}
   
    </div>
  );
}

export default App;

