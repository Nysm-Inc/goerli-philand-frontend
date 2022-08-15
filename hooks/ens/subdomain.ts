import { PHI_SUBDOMAINS_KEY } from "~/constants";

type CacheSubdomain = {
  [labelhash: string]: string;
};

export const getPhiSubdomain = (labelhash: string): string => {
  try {
    // @ts-ignore
    const subdomains: CacheSubdomain | null = JSON.parse(localStorage.getItem(PHI_SUBDOMAINS_KEY));
    return subdomains ? subdomains[labelhash] : "";
  } catch (err) {
    console.error(err);
    return "";
  }
};

export const setPhiSubdomain = (labelhash: string, name: string) => {
  try {
    // @ts-ignore
    const subdomains: CacheSubdomain = JSON.parse(localStorage.getItem(PHI_SUBDOMAINS_KEY));
    localStorage.setItem(PHI_SUBDOMAINS_KEY, JSON.stringify({ ...subdomains, [labelhash]: name }));
  } catch (err) {
    console.error(err);
  }
};
