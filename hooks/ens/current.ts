import { CURRENT_ENS_KEY } from "~/constants";

type CacheENS = {
  [address: string]: string;
};

export const getCurrentENS = (account?: string): string => {
  if (!account) return "";

  try {
    // @ts-ignore
    const prev: CacheENS = JSON.parse(localStorage.getItem(CURRENT_ENS_KEY));
    return prev[account];
  } catch (err) {
    return "";
  }
};

export const setCurrentENS = (ens: string, account?: string) => {
  if (!account) return;

  try {
    // @ts-ignore
    const prev: CacheENS = JSON.parse(localStorage.getItem(CURRENT_ENS_KEY));
    localStorage.setItem(CURRENT_ENS_KEY, JSON.stringify({ ...prev, [account]: ens }));
  } catch (err) {
    console.error(err);
  }
};
