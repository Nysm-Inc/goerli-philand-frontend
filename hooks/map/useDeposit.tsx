import { useCallback } from "react";
import { ethers } from "ethers";
import { Web3Provider } from "@ethersproject/providers";
import { PHI_MAP_CONTRACT_ADDRESS, PHI_OBJECT_CONTRACT_ADDRESS } from "~/constants";
import { PhiMapAbi } from "~/abi";

const useDeposit = (provider?: Web3Provider) => {
  return useCallback(
    async (args: { tokenId: number; amount: number }[]) => {
      if (!provider) return;

      const singer = provider.getSigner();
      const contract = new ethers.Contract(PHI_MAP_CONTRACT_ADDRESS, PhiMapAbi, singer);

      const calldata = [
        PHI_OBJECT_CONTRACT_ADDRESS,
        args.map((arg) => arg.tokenId),
        args.map((arg) => arg.amount),
        PHI_OBJECT_CONTRACT_ADDRESS,
      ];
      return await contract.batchDeposit(...calldata);
    },
    [provider]
  );
};

export default useDeposit;
