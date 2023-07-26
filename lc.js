//graphql query
const query = `
  query userContestRankingInfo($username: String!) {
    allQuestionsCount {
      difficulty
      count
    }
    matchedUser(username: $username) {
      contributions {
        points
      }
      profile {
        reputation
        ranking
      }
      submissionCalendar
      submitStats {
        acSubmissionNum {
          difficulty
          count
          submissions
        }
        totalSubmissionNum {
          difficulty
          count
          submissions
        }
      }
    }
    userContestRanking(username: $username) {
      attendedContestsCount
      rating
      globalRanking
      totalParticipants
      topPercentage
      badge {
        name
      }
    }
    userContestRankingHistory(username: $username) {
      attended
      trendDirection
      problemsSolved
      totalProblems
      finishTimeInSeconds
      rating
      ranking
      contest {
        title
        startTime
      }
    }
  }
`;

// format data
const formatData = (data) => {
  let sendData = {
    ...data,
  };
  sendData.totalSolved = data.matchedUser.submitStats.acSubmissionNum[0].count;
  sendData.totalSubmissions = data.matchedUser.submitStats.totalSubmissionNum;
  sendData.totalQuestions = data.allQuestionsCount[0].count;
  sendData.easySolved = data.matchedUser.submitStats.acSubmissionNum[1].count;
  sendData.totalEasy = data.allQuestionsCount[1].count;
  sendData.mediumSolved = data.matchedUser.submitStats.acSubmissionNum[2].count;
  sendData.totalMedium = data.allQuestionsCount[2].count;
  sendData.hardSolved = data.matchedUser.submitStats.acSubmissionNum[3].count;
  sendData.totalHard = data.allQuestionsCount[3].count;
  sendData.ranking = data.matchedUser.profile.ranking;
  
  sendData.contributionPoint = data.matchedUser.contributions.points;
  sendData.reputation = data.matchedUser.profile.reputation;
  sendData.submissionCalendar = JSON.parse(data.matchedUser.submissionCalendar);

  return sendData;
};

//fetching the data
exports.leetcode = (req, res) => {
  let user = req.params.id;
  fetch("https://leetcode.com/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Referer: "https://leetcode.com",
    },
    body: JSON.stringify({ query: query, variables: { username: user } }),
  })
    .then((result) => result.json())
    .then((data) => {
      if (data.errors) {
        res.send(data);
      } else {
        res.send(formatData(data.data));
      }
    })
    .catch((err) => {
      console.error("Error", err);
      res.send(err);
    });
};
