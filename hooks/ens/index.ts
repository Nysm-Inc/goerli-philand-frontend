import { useEffect, useState } from "react";
import { chain } from "wagmi";
import { CURRENT_ENS_KEY } from "~/constants";
import { getOwnedEnsDomains } from "~/utils/ens";

type CacheENS = {
  [address: string]: string;
};

const getENSFromStorage = (account?: string): string => {
  if (!account) return "";

  try {
    // @ts-ignore
    const prev: CacheENS = JSON.parse(localStorage.getItem(CURRENT_ENS_KEY));
    return prev[account];
  } catch (err) {
    console.error(err);
    return "";
  }
};

const setENS2Storage = (ens: string, account?: string) => {
  if (!account) return;

  try {
    // @ts-ignore
    const prev: CacheENS = JSON.parse(localStorage.getItem(CURRENT_ENS_KEY));
    localStorage.setItem(CURRENT_ENS_KEY, JSON.stringify({ ...prev, [account]: ens }));
  } catch (err) {
    console.error(err);
  }
};

const useENS = (
  account?: string,
  ens?: string | null,
  disabled?: boolean
): [{ isLoading: boolean; domains: string[] }, string, (ens: string) => void] => {
  const [isLoading, setIsLoading] = useState(true);
  const [current, setCurrent] = useState("");
  const [domains, setDomains] = useState<string[]>([]);

  const switchCurrentENS = (ens: string) => {
    setCurrent(ens);
    setENS2Storage(ens, account);
  };

  useEffect(() => {
    setIsLoading(true);
    if (!account || disabled) {
      setIsLoading(false);
      return;
    }

    (async () => {
      const ownedDomains = await getOwnedEnsDomains(account);
      setDomains(ownedDomains.map((domain) => domain.name));
      setIsLoading(false);
    })();
  }, [account, disabled]);

  useEffect(() => {
    if (!account || disabled) return;

    const prev = getENSFromStorage(account);
    switchCurrentENS(prev || ens || "");
  }, [account]);

  useEffect(() => {
    if (disabled) {
      setCurrent("");
      setDomains([]);
    }
  }, [disabled]);

  return [{ isLoading, domains }, current, switchCurrentENS];
};

export default useENS;
