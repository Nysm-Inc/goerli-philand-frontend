import { useCallback, useEffect, useState } from "react";
import { useBlockNumber } from "wagmi";
import { getOwnedEnsDomains } from "~/utils/ens";
import { getCurrentENS, setCurrentENS } from "./current";
import { getPhiSubdomain } from "./subdomain";

const useENS = (account?: string, ens?: string | null): [{ isLoading: boolean; domains: string[] }, string, (ens: string) => void] => {
  const [isLoading, setIsLoading] = useState(true);
  const [current, setCurrent] = useState("");
  const [domains, setDomains] = useState<string[]>([]);
  const { data: blockNumber } = useBlockNumber({ watch: true });

  const switchCurrentENS = useCallback(
    (ownedENS: string) => {
      setCurrent(ownedENS);
      setCurrentENS(ownedENS, account);
    },
    [account]
  );

  // memo: https://github.com/ensdomains/ens-app/issues/963
  const fetchOwnedENSDomains = useCallback(async (account: string) => {
    const ownedDomains = await getOwnedEnsDomains(account);
    return ownedDomains.reduce((memo, domain) => {
      if (domain.labelName) {
        return [...memo, domain.name];
      } else {
        const label = getPhiSubdomain(domain.labelhash);
        return label ? [...memo, label] : memo;
      }
    }, [] as string[]);
  }, []);

  useEffect(() => {
    if (!account) return;

    (async () => {
      const ownedDomains = await fetchOwnedENSDomains(account);
      if (ownedDomains) setDomains(ownedDomains);
    })();
  }, [blockNumber]);

  useEffect(() => {
    setIsLoading(true);
    setCurrent("");
    setDomains([]);
    if (!account) {
      setIsLoading(false);
      return;
    }

    (async () => {
      const ownedDomains = await fetchOwnedENSDomains(account);
      if (!ownedDomains) return;

      const prev = getCurrentENS(account);
      if (ownedDomains.includes(prev)) {
        setCurrent(prev || ens || "");
      } else {
        setCurrent(ens || "");
      }

      setDomains(ownedDomains);
      setIsLoading(false);
    })();
  }, [account]);

  return [{ isLoading, domains }, current, switchCurrentENS];
};

export default useENS;
