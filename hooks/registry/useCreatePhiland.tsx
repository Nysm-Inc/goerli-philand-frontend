import { useEffect, useState } from "react";
import { PHI_REGISTRY_CONTRACT_ADDRESS } from "~/constants";
import { PhiRegistryAbi } from "~/abi";
import { fetchLogCreatedPhilands } from "~/utils/graph";
import { useContractWrite } from "wagmi";

const useCreatePhiland = (ens?: string): [{ loading: boolean; isCreated: boolean }, () => void] => {
  const [loading, setLoading] = useState(true);
  const [isCreated, setIsCreated] = useState(false);

  const { write } = useContractWrite(
    {
      addressOrName: PHI_REGISTRY_CONTRACT_ADDRESS,
      contractInterface: PhiRegistryAbi,
    },
    "createPhiland",
    {
      args: ens ? [ens.slice(0, -4)] : [],
    }
  );

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
    write,
  ];
};

export default useCreatePhiland;
