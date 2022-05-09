import { useCallback } from "react";
import { ethers } from "ethers";
import type { Web3Provider } from "@ethersproject/providers";
import { PHI_MAP_CONTRACT_ADDRESS } from "~/constants";
import { PhiMapAbi } from "~/abi";

const useWriteObjects = (ens: string | null | undefined, provider?: Web3Provider) => {
  return useCallback(
    async (args: { contractAddress: string; tokenId: number; xStart: number; yStart: number }[]) => {
      if (!ens || !provider) return;

      const singer = provider.getSigner();
      const contract = new ethers.Contract(PHI_MAP_CONTRACT_ADDRESS, PhiMapAbi, singer);

      const calldata = [ens.slice(0, -4), args];
      return await contract.batchWriteObjectToLand(...calldata);
    },
    [ens, provider]
  );
};

export default useWriteObjects;
