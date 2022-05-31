import { useCallback, useEffect, useState } from "react";
import { ethers, Event } from "ethers";
import type { Web3Provider } from "@ethersproject/providers";
import { PHI_REGISTRY_CONTRACT_ADDRESS } from "~/constants";
import { PhiRegistryAbi } from "~/abi";
import { fetchLogCreatedPhilands } from "~/utils/graph";

const useCreatePhiland = (
  ens: string | null | undefined,
  provider?: Web3Provider
): [{ loading: boolean; isCreated: boolean }, () => Promise<any>] => {
  const [loading, setLoading] = useState(true);
  const [isCreated, setIsCreated] = useState(false);

  useEffect(() => {
    if (!ens) return;
    setIsCreated(false);
    setLoading(true);

    (async () => {
      const logCreatedPhilands = await fetchLogCreatedPhilands(ens?.slice(0, -4));
      setIsCreated(logCreatedPhilands.length > 0);
      setLoading(false);
    })();
  }, [ens]);

  return [
    {
      loading: loading,
      isCreated: isCreated,
    },
    useCallback(async () => {
      if (!ens || !provider) return;

      const singer = provider.getSigner();
      const contract = new ethers.Contract(PHI_REGISTRY_CONTRACT_ADDRESS, PhiRegistryAbi, singer);

      const calldata = [ens.slice(0, -4)];
      return await contract.createPhiland(...calldata);
    }, [ens, provider]),
  ];
};

export default useCreatePhiland;
