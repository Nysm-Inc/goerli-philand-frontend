import { useEffect, useState } from "react";
import { getEXP } from "~/utils/leader";

const useEXP = (address: string): number => {
  const [exp, setEXP] = useState(0);

  useEffect(() => {
    if (!address) return;

    (async () => {
      const exp = await getEXP(address);
      setEXP(exp);
    })();
  }, [address]);

  return exp;
};

export default useEXP;
