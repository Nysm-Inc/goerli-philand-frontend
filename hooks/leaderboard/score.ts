import { useCallback, useEffect, useState } from "react";
import type { MyScore, TopScoreList } from "~/types/leaderboard";
import { getMyScore, getTopScoreList } from "~/utils/leaderboard";

const defaultMyScore = { activity: 0, social: 0, attention: 0, activityRank: 0, socialRank: 0, attentionRank: 0 };

const useScore = (ens?: string, refresh?: boolean) => {
  const [myScore, setMyScore] = useState<MyScore>(defaultMyScore);
  const [topScoreList, setTopScoreList] = useState<TopScoreList>({ activity: [], social: [], attention: [] });

  const fetchMyScore = useCallback(async () => {
    if (!ens) return;
    const _score = await getMyScore(ens);
    setMyScore(_score);
  }, [ens]);
  const fetchTopScoreList = useCallback(async () => {
    const _score = await getTopScoreList();
    setTopScoreList(_score);
  }, []);

  useEffect(() => {
    fetchMyScore();
  }, [ens]);

  useEffect(() => {
    fetchTopScoreList();
  }, []);

  useEffect(() => {
    if (!refresh) return;

    fetchMyScore();
    fetchTopScoreList();
  }, [refresh]);

  return { myScore, topScoreList };
};

export default useScore;
