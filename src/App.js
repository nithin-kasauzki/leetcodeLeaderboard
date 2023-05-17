import React, { useEffect, useState } from "react";
import { Button, Container, Typography } from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import { CloudUpload } from "@material-ui/icons";
import Leaderboard from "./LeaderboardComponent";
import Papa from "papaparse";

import fetchUserContestRankingHistory from "./api/apiCall";

function App() {
  const [rankingData, setRankingData] = useState([]);
  const [dataFetched, setDataFetched] = useState(false); 
  const [names, setNames] = useState([]);
  const [data, setData] = useState([]);
  const [column, setColumn] = useState([]);
  const [fileUploaded, setFileUploaded] = useState(false);
  const theme = useTheme();
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

    const formattedData = results.map((data, index) => {
      const rating = data.data.userContestRanking?.rating || 0;
      const worldRank = data.data.userContestRanking?.globalRanking || 0;
    
      return {
        name: names[index],
        rating: rating !== null ? parseFloat(rating).toFixed(0) : 0,
        worldRank: worldRank !== null ? worldRank : 0,
      };
    });
    

    
    formattedData.sort((a, b) => b.rating - a.rating);

    setRankingData(formattedData);
    setDataFetched(true); 
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
        setFileUploaded(true); 
        console.log(result.data);
        console.log(ValueArray);
      },
    });
  };

  useEffect(() => {
    fetchData(); 

  }, []);

  const containerStyle = {
    textAlign: "center",
    margin: "auto",
    [theme.breakpoints.up("md")]: {
      maxWidth: "80%", 
    },
    [theme.breakpoints.down("sm")]: {
      maxWidth: "90%", 
    },
  };

  const buttonStyle = {
    marginTop: "20px",
    marginBottom: "20px",
    marginLeft: "10px",
    backgroundColor: fileUploaded ? "green" : "inherit",
    color: fileUploaded ? "white" : "inherit",
  };

  const fileInputStyle = {
    display: "none",
  };

  return (
    <Container style={containerStyle}>
      <input
        type="file"
        onChange={handleFileUpload}
        id="file-upload"
        style={fileInputStyle}
      />
      <label htmlFor="file-upload">
        <Button
          variant="contained"
          color="primary"
          component="span"
          startIcon={<CloudUpload />}
          style={buttonStyle}
        >
          Upload CSV
        </Button>
      </label>
      <Button
        variant="contained"
        color="primary"
        onClick={fetchData}
        style={buttonStyle}
      >
        Refresh
      </Button>
      {dataFetched && <Leaderboard leaderboard={rankingData} />}
    </Container>
  );
}

export default App;
