import { useCallback, useEffect, useState } from "react";
import { getEXP, updateEXP as _updateEXP } from "~/utils/leaderboard";
import useBlockNumber from "~/hooks/helper/useBlockNumber";

export const useEXP = (address: string, refresh?: boolean, watch?: boolean): number => {
  const blockNumber = useBlockNumber();
  const [exp, setEXP] = useState(0);
  const updateEXP = useUpdateEXP(address);
  const fetchEXP = useCallback(async () => {
    if (!address) return;

    const exp = await getEXP(address);
    setEXP(exp);
  }, [address]);

  useEffect(() => {
    fetchEXP();
  }, [refresh]);

  useEffect(() => {
    fetchEXP();
    updateEXP();
  }, [address]);

  useEffect(() => {
    if (watch) fetchEXP();
  }, [blockNumber]);

  return exp;
};

export const useUpdateEXP = (address: string): (() => Promise<void>) => {
  const updateEXP = useCallback(async () => {
    if (!address) return;

    return _updateEXP(address);
  }, [address]);

  return updateEXP;
};
