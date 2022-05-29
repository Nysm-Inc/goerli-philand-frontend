import { useCallback, useEffect, useState } from "react";
import { ethers, Event } from "ethers";
import type { Web3Provider } from "@ethersproject/providers";
import { PHI_REGISTRY_CONTRACT_ADDRESS } from "~/constants";
import { PhiRegistryAbi } from "~/abi";

const useCreatePhiland = (
  ens: string | null | undefined,
  provider?: Web3Provider
): [{ loading: boolean; created: boolean }, () => Promise<any>] => {
  const [loading, setLoading] = useState(true);
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    if (!ens || !provider) return;
    setEvents([]);
    setLoading(true);

    const singer = provider.getSigner();
    const contract = new ethers.Contract(PHI_REGISTRY_CONTRACT_ADDRESS, PhiRegistryAbi, singer);
    const filter = contract.filters.LogCreatePhiland();

    (async () => {
      // todo: more faster when add address
      const pastEvents = await contract.queryFilter(filter, 6872403);
      setEvents(pastEvents);
      setLoading(false);
    })();
  }, [ens, provider]);

  return [
    {
      loading: loading,
      created: events.some((e) => e.args?.[1] === ens?.slice(0, -4)),
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
