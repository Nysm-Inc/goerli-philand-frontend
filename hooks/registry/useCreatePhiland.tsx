import { useCallback } from "react";
import { ethers } from "ethers";
import type { Web3Provider } from "@ethersproject/providers";
import { PHI_REGISTRY_CONTRACT_ADDRESS } from "~/constants";
import { PhiRegistryAbi } from "~/abi";

const useCreatePhiland = (ens: string | null | undefined, provider?: Web3Provider) => {
  return useCallback(async () => {
    if (!ens || !provider) return;

    const singer = provider.getSigner();
    const contract = new ethers.Contract(PHI_REGISTRY_CONTRACT_ADDRESS, PhiRegistryAbi, singer);

    const calldata = [ens.slice(0, -4)];
    return await contract.createPhiland(...calldata);
  }, [ens, provider]);
};

export default useCreatePhiland;
