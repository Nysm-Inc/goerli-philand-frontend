import { useEffect, useState } from "react";
import { BigNumber, ethers } from "ethers";
import type { Web3Provider } from "@ethersproject/providers";
import { PhiMapAbi } from "~/abi";
import { PHI_MAP_CONTRACT_ADDRESS } from "~/constants";
import { PhiObject } from "~/types";

type PhiLink = { title: string; url: string };

const useViewLink = (ens: string | null | undefined, provider?: Web3Provider): PhiLink | undefined => {
  const [link, setLink] = useState<PhiLink | undefined>(undefined);

  useEffect(() => {
    if (!ens || !provider) return;

    (async () => {
      const singer = provider.getSigner();
      const contract = new ethers.Contract(PHI_MAP_CONTRACT_ADDRESS, PhiMapAbi, singer);

      const calldata = [ens.slice(0, -4), 1];
      const philink = await contract.viewObjectLink(...calldata);

      setLink({ title: philink?.[0].title, url: philink?.[0].url });
    })();
  }, [ens, provider]);

  return link;
};

export default useViewLink;
