import { useCallback, useEffect, useState } from "react";
import { getOwnedEnsDomains } from "~/utils/ens";

// todo: localStorage
const useENS = (account?: string, ens?: string | null): [string[], string, (ens: string) => void] => {
  const [current, setCurrent] = useState("");
  const [domains, setDomains] = useState<string[]>([]);

  const switchCurrentENS = useCallback((ens: string) => {
    setCurrent(ens);
  }, []);

  useEffect(() => {
    if (!account) return;

    (async () => {
      const ownedDomains = await getOwnedEnsDomains(account);
      setDomains(ownedDomains.map((domain) => domain.name));
    })();
  }, [account]);

  useEffect(() => {
    if (!ens) return;

    setCurrent(ens);
  }, [ens]);

  return [domains, current, switchCurrentENS];
};

export default useENS;
