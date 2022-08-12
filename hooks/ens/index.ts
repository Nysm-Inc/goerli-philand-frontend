import { useCallback, useEffect, useState } from "react";
import { getOwnedEnsDomains } from "~/utils/ens";
import { getCurrentENS, setCurrentENS } from "./current";
import { getPhiSubdomain } from "./subdomain";

const useENS = (
  account?: string,
  ens?: string | null
): [{ isLoading: boolean; domains: string[] }, string, (ens: string) => void, () => void] => {
  const [isLoading, setIsLoading] = useState(true);
  const [current, setCurrent] = useState("");
  const [domains, setDomains] = useState<string[]>([]);
  const [_refetch, setRefetch] = useState(false);

  const switchCurrentENS = useCallback(
    (ownedENS: string) => {
      setCurrent(ownedENS);
      setCurrentENS(ownedENS, account);
    },
    [account]
  );
  const refetch = useCallback(() => setRefetch((prev) => !prev), []);

  useEffect(() => {
    setIsLoading(true);
    setCurrent("");
    setDomains([]);
    if (!account) {
      setIsLoading(false);
      return;
    }

    // memo
    // https://github.com/ensdomains/ens-app/issues/963
    (async () => {
      const ownedDomains = await getOwnedEnsDomains(account);
      const _domains = ownedDomains.reduce((memo, domain) => {
        if (domain.labelName) {
          return [...memo, domain.name];
        } else {
          const label = getPhiSubdomain(domain.labelhash);
          return label ? [...memo, label] : memo;
        }
      }, [] as string[]);

      const prev = getCurrentENS(account);
      if (_domains.includes(prev)) {
        setCurrent(prev || ens || "");
      } else {
        setCurrent(ens || "");
      }

      setDomains(_domains);
      setIsLoading(false);
    })();
  }, [account, _refetch]);

  return [{ isLoading, domains }, current, switchCurrentENS, refetch];
};

export default useENS;
