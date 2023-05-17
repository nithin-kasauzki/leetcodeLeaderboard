import axios from "axios";

const fetchUserContestRankingHistory = async (query) => {
  try {
    const url = `https://leetcode.com/graphql?query=${encodeURIComponent(query)}`;
    const response = await axios.get(url);

    return response.data;
  } catch (error) {
    console.error(error);

    // Return default values with rating and globalRanking set to 0
    return {
      userContestRanking: {
        attendedContestsCount: 0,
        rating: 0,
        globalRanking: 0,
      },
    };
  }
};

export default fetchUserContestRankingHistory;
