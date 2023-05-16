import axios from "axios";
const fetchUserContestRankingHistory = async (query) => {
    try {
      const url = `https://leetcode.com/graphql?query=${encodeURIComponent(
        query
      )}`;
      const response = await axios.get(url);

      return response.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  export default fetchUserContestRankingHistory;