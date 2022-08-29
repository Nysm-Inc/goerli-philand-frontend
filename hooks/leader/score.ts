import { useCallback, useEffect, useState } from "react";
import { useBlockNumber } from "wagmi";
import { getScore } from "~/utils/leader";

const useScore = (ens?: string, top?: boolean, watch?: boolean) => {
  const { data: blockNumber } = useBlockNumber({ watch: !!watch });
  const [score, setScore] = useState(undefined);
  const fetchScore = useCallback(async () => {
    const _score = await getScore(ens, top);
    setScore(_score);
  }, [ens]);

  useEffect(() => {
    if (!watch) return;

    fetchScore();
  }, [blockNumber]);

  useEffect(() => {
    fetchScore();
  }, [ens]);

  return score;
};

export default useScore;
