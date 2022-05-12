import { useEffect, useState } from "react";
import type { Web3Provider } from "@ethersproject/providers";
import { ethers, Event } from "ethers";
import { PHI_MAP_CONTRACT_ADDRESS, PHI_REGISTRY_CONTRACT_ADDRESS } from "~/constants";
import { PhiMapAbi, PhiRegistryAbi } from "~/abi";

export const useCreatedPhiland = (
  ens: string | null | undefined,
  provider?: Web3Provider
): { loading: boolean; isCreated: boolean } => {
  const [loading, setLoading] = useState(true);
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    if (!ens || !provider) return;
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

  return { loading: loading, isCreated: events.some((e) => e.args?.[1] === ens?.slice(0, -4)) };
};
