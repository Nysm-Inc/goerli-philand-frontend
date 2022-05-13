import { useCallback } from "react";
import { ethers } from "ethers";
import { Web3Provider } from "@ethersproject/providers";
import { PHI_MAP_CONTRACT_ADDRESS, PHI_OBJECT_CONTRACT_ADDRESS } from "~/constants";
import { PhiMapAbi } from "~/abi";

const useRemoveLink = (ens: string | null | undefined, provider?: Web3Provider) => {
  return useCallback(
    async (objectIdx: number) => {
      if (!ens || !provider) return;

      const singer = provider.getSigner();
      const contract = new ethers.Contract(PHI_MAP_CONTRACT_ADDRESS, PhiMapAbi, singer);

      const calldata = [ens.slice(0, -4), objectIdx];
      return await contract.removeLinkFromObject(...calldata);
    },
    [ens, provider]
  );
};

export default useRemoveLink;
