import { useCallback } from "react";
import { ethers } from "ethers";
import type { Web3Provider } from "@ethersproject/providers";
import { PHI_MAP_CONTRACT_ADDRESS } from "~/constants";
import { PhiMapAbi } from "~/abi";
import { WriteObject } from "~/types";

const useSave = (ens: string | null | undefined, provider?: Web3Provider) => {
  return useCallback(
    async (
      removeArgs: { removeIdxs: (string | number)[]; remove_check: boolean },
      writeArgs: WriteObject[],
      linkArgs: { title: string; url: string }[]
    ) => {
      if (!ens || !provider) return;

      const singer = provider.getSigner();
      const contract = new ethers.Contract(PHI_MAP_CONTRACT_ADDRESS, PhiMapAbi, singer);

      const calldata = [ens.slice(0, -4), removeArgs.removeIdxs, removeArgs.remove_check, writeArgs, linkArgs];
      return await contract.save(...calldata);
    },
    [ens, provider]
  );
};

export default useSave;
