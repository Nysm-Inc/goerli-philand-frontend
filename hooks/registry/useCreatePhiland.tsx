import { MAP_CONTRACT_ADDRESS, REGISTRY_CONTRACT_ADDRESS } from "~/constants";
import { MapAbi, RegistryAbi } from "~/abi";
import { useContractRead, useContractWrite, useWaitForTransaction } from "wagmi";
import { Tx } from "~/types/wagmi";

const nullAddress = "0x0000000000000000000000000000000000000000";

const useCreatePhiland = (ens?: string, disabled?: boolean): [boolean, { createPhiland: () => void; tx: Tx }] => {
  const { data } = useContractRead(
    {
      addressOrName: MAP_CONTRACT_ADDRESS,
      contractInterface: MapAbi,
    },
    "ownerOfPhiland",
    {
      args: ens ? [ens.slice(0, -4)] : null,
      watch: true,
      enabled: !!ens && !disabled,
      onSuccess(data) {
        //
      },
    }
  );

  const {
    data: writeData,
    write,
    status: tmpStatus,
  } = useContractWrite(
    {
      addressOrName: REGISTRY_CONTRACT_ADDRESS,
      contractInterface: RegistryAbi,
    },
    "createPhiland"
  );
  const { status } = useWaitForTransaction({ hash: writeData?.hash || "" });

  return [
    // @ts-ignore
    data && data !== nullAddress,
    {
      createPhiland: () =>
        write({
          args: ens ? [ens.slice(0, -4)] : [],
        }),
      tx: {
        hash: data?.hash,
        tmpStatus,
        status,
      },
    },
  ];
};

export default useCreatePhiland;
