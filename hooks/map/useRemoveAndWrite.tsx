import { useCallback } from "react";
import { ethers } from "ethers";
import type { Web3Provider } from "@ethersproject/providers";
import { PHI_MAP_CONTRACT_ADDRESS, PHI_OBJECT_CONTRACT_ADDRESS } from "~/constants";
import { PhiMapAbi } from "~/abi";

const useRemoveAndWrite = (ens: string | null | undefined, provider?: Web3Provider) => {
  return useCallback(
    async (
      removeArgs: { removeIdxs: number[]; isRemove: boolean },
      writeArgs: { contractAddress: string; tokenId: number; xStart: number; yStart: number }[],
      linkArgs: { title: string; url: string }[]
    ) => {
      if (!ens || !provider) return;

      const singer = provider.getSigner();
      const contract = new ethers.Contract(PHI_MAP_CONTRACT_ADDRESS, PhiMapAbi, singer);

      const calldata = [ens.slice(0, -4), removeArgs.removeIdxs, removeArgs.isRemove, writeArgs, linkArgs];
      return await contract.batchRemoveAndWrite(...calldata);
    },
    [ens, provider]
  );
};

export default useRemoveAndWrite;
