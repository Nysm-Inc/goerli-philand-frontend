import { useContractRead, useContractWrite, useWaitForTransaction } from "wagmi";
import { TransactionResponse } from "@ethersproject/providers";
import { MAP_CONTRACT_ADDRESS, REGISTRY_CONTRACT_ADDRESS } from "~/constants";
import { MapAbi, RegistryAbi } from "~/abi";
import { Tx } from "~/types/wagmi";

const nullAddress = "0x0000000000000000000000000000000000000000";

const useCreatePhiland = (
  ens?: string,
  disabled?: boolean
): [boolean, { createPhiland: () => Promise<TransactionResponse | undefined>; tx: Tx }] => {
  const { data } = useContractRead({
    addressOrName: MAP_CONTRACT_ADDRESS,
    contractInterface: MapAbi,
    functionName: "ownerOfPhiland",
    args: ens ? [ens.slice(0, -4)] : null,
    watch: true,
    enabled: !!ens && !disabled,
  });

  const {
    data: writeData,
    writeAsync,
    status: tmpStatus,
  } = useContractWrite({
    addressOrName: REGISTRY_CONTRACT_ADDRESS,
    contractInterface: RegistryAbi,
    functionName: "createPhiland",
  });
  const { status } = useWaitForTransaction({ hash: writeData?.hash || "" });

  return [
    // @ts-ignore
    data && data !== nullAddress,
    {
      createPhiland: () =>
        writeAsync({
          args: ens ? [ens.slice(0, -4)] : [],
        }),
      tx: {
        hash: writeData?.hash,
        tmpStatus,
        status,
      },
    },
  ];
};

export default useCreatePhiland;
