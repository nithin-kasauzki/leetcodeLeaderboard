
import "./App.css";

import fetchUserContestRankingHistory from "./api/apiCall";

function App() {
  const name = "neal_wu"
  const query = `query {
    userContestRanking(username: "${name}") {
      attendedContestsCount
      rating
      globalRanking
    }
  }`;
  const callFunc = async () => {
    fetchUserContestRankingHistory(query).then((data) => {
      console.log(data);
    });
  };

  return (
    //write your code here for leaderboard component, if you want create a new file and then import here or do here itself
    <div>
      <button onClick={callFunc}>Click me</button>
      <button onClick={callFunc}>Click me</button>
    </div>
  );
}

export default App;
