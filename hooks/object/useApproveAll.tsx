import { useCallback } from "react";
import { ethers } from "ethers";
import type { Web3Provider } from "@ethersproject/providers";
import { PHI_MAP_CONTRACT_ADDRESS, PHI_OBJECT_CONTRACT_ADDRESS } from "~/constants";
import { PhiObjectAbi } from "~/abi";

const useApproveAll = (provider?: Web3Provider) => {
  return useCallback(async () => {
    if (!provider) return;

    const singer = provider.getSigner();
    const contract = new ethers.Contract(PHI_OBJECT_CONTRACT_ADDRESS, PhiObjectAbi, singer);

    const calldata = [PHI_MAP_CONTRACT_ADDRESS, 1];
    return await contract.setApprovalForAll(...calldata);
  }, [provider]);
};

export default useApproveAll;
