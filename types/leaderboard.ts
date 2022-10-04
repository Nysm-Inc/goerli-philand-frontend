export type MyScore = {
  landPower: number;
  social: number;
  attention: number;
  landPowerRank: number;
  socialRank: number;
  attentionRank: number;
};

type Score = { name: string; value: number };

export type TopScoreList = {
  landPower: Score[];
  social: Score[];
  attention: Score[];
};
