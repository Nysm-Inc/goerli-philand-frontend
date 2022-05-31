import { useCallback } from "react";
import { ethers } from "ethers";
import { Web3Provider } from "@ethersproject/providers";
import { PHI_MAP_CONTRACT_ADDRESS, PHI_OBJECT_CONTRACT_ADDRESS } from "~/constants";
import { PhiMapAbi } from "~/abi";

const useDeposit = (ens: string | null | undefined, provider?: Web3Provider) => {
  return useCallback(
    async (args: { tokenId: number; amount: number }[]) => {
      if (!ens || !provider) return;

      const singer = provider.getSigner();
      const contract = new ethers.Contract(PHI_MAP_CONTRACT_ADDRESS, PhiMapAbi, singer);

      const calldata = [
        ens.slice(0, -4),
        args.map(() => PHI_OBJECT_CONTRACT_ADDRESS),
        args.map((arg) => arg.tokenId),
        args.map((arg) => arg.amount),
      ];
      return await contract.batchDeposit(...calldata);
    },
    [ens, provider]
  );
};

export default useDeposit;
