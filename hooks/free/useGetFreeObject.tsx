import { useContractWrite, useWaitForTransaction } from "wagmi";
import type { TransactionResponse } from "@ethersproject/providers";
import { FREE_OBJECT_CONTRACT_ADDRESS } from "~/constants";
import { FreeObjectAbi } from "~/abi";
import { Tx } from "~/types/tx";

const useGetFreeObject = (): { getFreeObject: (tokenIds: number[]) => Promise<TransactionResponse | undefined>; tx: Tx } => {
  const {
    data,
    writeAsync,
    status: tmpStatus,
  } = useContractWrite({
    addressOrName: FREE_OBJECT_CONTRACT_ADDRESS,
    contractInterface: FreeObjectAbi,
    functionName: "batchGetFreeObject",
  });
  const { status } = useWaitForTransaction({ hash: data?.hash || "" });

  return {
    getFreeObject: async (tokenIds: number[]) => {
      const calldata = [tokenIds];
      return writeAsync({ args: calldata });
    },
    tx: {
      hash: data?.hash,
      tmpStatus,
      status,
      action: "Claiming Free Objects",
    },
  };
};

export default useGetFreeObject;
