import { useCallback, useEffect, useState } from "react";
import { Web3Provider } from "@ethersproject/providers";
import { getOwnedEnsDomains } from "~/utils/ens";

// todo: localStorage
const useENS = (
  account: string | null | undefined,
  ens: string | null | undefined,
  provider?: Web3Provider
): [string[], string, (ens: string) => void] => {
  const [current, setCurrent] = useState("");
  const [domains, setDomains] = useState<string[]>([]);

  const switchCurrentENS = useCallback((ens: string) => {
    setCurrent(ens);
  }, []);

  useEffect(() => {
    if (!account || !provider) return;

    (async () => {
      const ownedDomains = await getOwnedEnsDomains(account);
      setDomains(ownedDomains.map((domain) => domain.name));
    })();
  }, [account, provider]);

  useEffect(() => {
    if (!ens) return;

    setCurrent(ens);
  }, [ens]);

  return [domains, current, switchCurrentENS];
};

export default useENS;
