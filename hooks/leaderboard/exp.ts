import { useCallback, useEffect, useState } from "react";
import { getEXP, updateEXP as _updateEXP } from "~/utils/leaderboard";

export const useEXP = (address: string, refresh?: boolean): number => {
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

  return exp;
};

export const useUpdateEXP = (address: string): (() => Promise<void>) => {
  const updateEXP = useCallback(async () => {
    if (!address) return;

    return _updateEXP(address);
  }, [address]);

  return updateEXP;
};
