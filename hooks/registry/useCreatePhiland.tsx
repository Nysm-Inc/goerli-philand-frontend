import { PHI_MAP_CONTRACT_ADDRESS, PHI_REGISTRY_CONTRACT_ADDRESS } from "~/constants";
import { PhiMapAbi, PhiRegistryAbi } from "~/abi";
import { useContractRead, useContractWrite } from "wagmi";

const nullAddress = "0x0000000000000000000000000000000000000000";

const useCreatePhiland = (ens?: string, disabled?: boolean): [boolean, boolean, () => void] => {
  const { data, isFetching } = useContractRead(
    {
      addressOrName: PHI_MAP_CONTRACT_ADDRESS,
      contractInterface: PhiMapAbi,
    },
    "ownerOfPhiland",
    {
      args: ens ? [ens.slice(0, -4)] : [],
      watch: true,
      enabled: !disabled,
      onSuccess(data) {
        //
      },
    }
  );

  const { write } = useContractWrite(
    {
      addressOrName: PHI_REGISTRY_CONTRACT_ADDRESS,
      contractInterface: PhiRegistryAbi,
    },
    "createPhiland"
  );

  return [
    // @ts-ignore
    data && data !== nullAddress,
    isFetching,
    () =>
      write({
        args: ens ? [ens.slice(0, -4)] : [],
      }),
  ];
};

export default useCreatePhiland;
