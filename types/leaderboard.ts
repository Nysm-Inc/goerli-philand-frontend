export type MyScore = {
  activity: number;
  social: number;
  attention: number;
  activityRank: number;
  socialRank: number;
  attentionRank: number;
};

type Score = { name: string; value: number };

export type TopScoreList = {
  activity: Score[];
  social: Score[];
  attention: Score[];
};
