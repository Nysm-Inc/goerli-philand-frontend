import { useCallback, useEffect, useState } from "react";
import { chain } from "wagmi";
import { getOwnedEnsDomains } from "~/utils/ens";

// todo: localStorage => [address: string]: string
const useENS = (
  account?: string,
  ens?: string | null,
  chainId?: number
): [{ isLoading: boolean; domains: string[] }, string, (ens: string) => void] => {
  const [isLoading, setIsLoading] = useState(true);
  const [current, setCurrent] = useState("");
  const [domains, setDomains] = useState<string[]>([]);

  const switchCurrentENS = useCallback((ens: string) => {
    setCurrent(ens);
  }, []);

  useEffect(() => {
    setIsLoading(true);
    if (!account || chainId !== chain.goerli.id) {
      setIsLoading(false);
      return;
    }

    (async () => {
      const ownedDomains = await getOwnedEnsDomains(account);
      setDomains(ownedDomains.map((domain) => domain.name));
      setIsLoading(false);
    })();
  }, [account, chainId]);

  useEffect(() => {
    setCurrent(ens || "");
  }, [ens]);

  useEffect(() => {
    if (chainId !== chain.goerli.id) {
      setCurrent("");
      setDomains([]);
    }
  }, [chainId]);

  return [{ isLoading, domains }, current, switchCurrentENS];
};

export default useENS;
