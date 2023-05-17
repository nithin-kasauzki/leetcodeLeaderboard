import React, { useEffect, useState } from "react";
import "./App.css";

import fetchUserContestRankingHistory from "./api/apiCall";
import Leaderboard from "./LeaderboardComponent";
import Papa from "papaparse";
import UsernamesComponent from "./csv/usernamesComp";

function App() {
  const [rankingData, setRankingData] = useState([]);
  const [dataFetched, setDataFetched] = useState(false); // Flag to track data fetch status
  const [names, setNames] = useState([]);
  const [data, setData] = useState([]);
  const [column, setColumn] = useState([]);
  const [Value, setValue] = useState([]);
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
  const handleFileUpload = (event) => {
    Papa.parse(event.target.files[0], {
      header: true,
      skipEmptyLines: true,
      complete: function (result) {
        const ValueArray = result.data
          .map((d) => Object.values(d)[0])
          .filter(Boolean)
          .map((name) => name.replace(/'/g, '"'));
        setData(result.data);
        setColumn(Object.keys(result.data[0]));
        setNames(ValueArray);
        console.log(result.data);
        console.log(ValueArray);
      },
    });
  };

  useEffect(() => {
    fetchData(); // Fetch data on component mount

    // const interval = setInterval(fetchData, 10000000); 

    // return () => {
    //   clearInterval(interval); // Clean up the interval on component unmount
    // };
  }, []);

  return (
    <div>
      <input type="file" onChange={handleFileUpload} />
      <button onClick={fetchData}>REFRESH</button>

      {dataFetched && <Leaderboard leaderboard={rankingData} />}
    </div>
  );
}

export default App;
