import { useContractWrite, useWaitForTransaction } from "wagmi";
import { TransactionResponse } from "@ethersproject/providers";
import { REGISTRY_CONTRACT_ADDRESS } from "~/constants";
import { RegistryAbi } from "~/abi";
import { Tx } from "~/types/tx";

const useChangePhilandOwner = (ens?: string): { changePhilandOwner: () => Promise<TransactionResponse | undefined>; tx: Tx } => {
  const {
    data,
    writeAsync,
    status: tmpStatus,
  } = useContractWrite({
    addressOrName: REGISTRY_CONTRACT_ADDRESS,
    contractInterface: RegistryAbi,
    functionName: "changePhilandOwner",
  });
  const { status } = useWaitForTransaction({ hash: data?.hash || "" });

  return {
    changePhilandOwner: () =>
      writeAsync({
        args: ens ? [ens.slice(0, -4)] : [],
      }),
    tx: {
      hash: data?.hash,
      tmpStatus,
      status,
    },
  };
};

export default useChangePhilandOwner;
