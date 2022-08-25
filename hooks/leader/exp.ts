import { useEffect, useState } from "react";
import { useBlockNumber } from "wagmi";
import { getEXP } from "~/utils/leader";

const useEXP = (address: string, watch?: boolean): number => {
  const { data: blockNumber } = useBlockNumber({ watch: !!watch });
  const [exp, setEXP] = useState(0);

  useEffect(() => {
    if (!address) return;

    (async () => {
      const exp = await getEXP(address);
      setEXP(exp);
    })();
  }, [address, blockNumber]);

  return exp;
};

export default useEXP;
