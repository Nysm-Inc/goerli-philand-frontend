import { useCallback, useEffect, useState } from "react";
import { useBlockNumber } from "wagmi";
import { getEXP, updateEXP as _updateEXP } from "~/utils/leader";

export const useEXP = (address: string, watch?: boolean): number => {
  const { data: blockNumber } = useBlockNumber({ watch: !!watch });
  const [exp, setEXP] = useState(0);
  const updateEXP = useUpdateEXP(address);
  const fetchEXP = useCallback(async () => {
    if (!address) return;

    const exp = await getEXP(address);
    setEXP(exp);
  }, [address]);

  useEffect(() => {
    fetchEXP();
  }, [blockNumber]);

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
